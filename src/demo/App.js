import React,{ useState,useEffect} from 'react';
import './css/base.css'
import axios from 'axios'
import { Layout,Input,Tabs,Menu} from 'antd'
import { StepBackwardOutlined, StepForwardOutlined, CaretRightOutlined ,PauseOutlined } from '@ant-design/icons';
const { Header, Footer, Content,Sider } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const guid = 126548448;
const audioCtx = new AudioContext();
let source = audioCtx.createBufferSource();
let isStart = true;
//分页
let page = {
  p:1,
  n:10
}
function Conctrl(bool){
  if(bool){
    return  <PauseOutlined className="iconFont"/>
   
  }else{
    return  <CaretRightOutlined className="iconFont" />
  }
}
function playFn(setPlay,play){
  setPlay(play)
  if(play){
    if(isStart){
      source.start(0);
      isStart = false;
    }else{
      audioCtx.resume()
    }
   
  }else{
    audioCtx.suspend()
  }
  
}
//获取音乐
function music(url,guid){

  axios.get(url).then(res=>{
    let data = res.data.data;
     data.items.forEach(item=>{
       fetch(`/mp3/${item.filename}?fromtag=0&guid=${guid}&vkey=${item.vkey}`,{
         method: 'get',
         responseType: 'arraybuffer'
     }).then(res => {     
         return res.arrayBuffer();
     }).then(buf => {
       audioCtx.decodeAudioData(buf).then((decodedData)=>{
       source.buffer = decodedData;
       source.connect(audioCtx.destination);
       source.loop = true;
       })
     })
    })
  })
}
//https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=简单爱
// function init(){
//   //获取音乐key
//   const url = "/vkey?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400003lghpv0jfFXG.m4a&guid="+guid;
//   music(url,guid);

// }
 function search(val,setData){
  /*
    p：页数，从1开始
    n：每一页显示的条数
    w：搜索关键字
  */

   axios.get(`/serch?aggr=1&cr=1&flag_qc=0&p=${page.p}&n=${page.n}&w=${val}`)
  .then(res=>{
     
     setData(eval(res.data));

  })
}
function callback(data){
  const list = data.data.song.list;
  return list;
}
function clickResult(val){
  const songmid = val.songmid;
  const filename = "C400"+val.songmid+".m4a";
  const url = `/vkey?format=json205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=${filename}&guid=${guid}`;
  music(url,guid);
}
function change(key) {
  console.log(key);
}
// const onClick = ({key}) => {
//   console.log(key)
 
// };
function menu(data,playFn){
  return (<Menu selectable={false} onClick={({key})=>{
          clickResult(data[key])
          playFn();
          }}>
    {
      data.map((item,index)=>{
      return (<Menu.Item key={index}>{item.albumname}</Menu.Item>)
      })
    }
  </Menu>)

}
function App() {
  let [ play,setPlay ] = useState(false);
  let [ data,setData ] = useState([]);
  // const [options, setOptions] = useState([]);
  // useEffect(()=>{
  //   init();
  // },[]);
  //albumname

  return (
    <div className="App">


    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header style={{padding:'0px'}}>
        
        <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onChange={(e)=>{search(e.target.value,setData)}}
        onSearch={value => (search(value,setData))}
        onBlur={()=>{setData([])}}
        onFocus={(e)=>{search(e.target.value,setData)}}
        />
        <div className="seachResult">

        {
          menu(data,playFn.bind(this,setPlay,true))
        }

        </div>
        
   
      
        
    
        
    
        </Header>
        <Content>
        <Tabs defaultActiveKey="1" onChange={change}>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>,
          
        </Content>
        <Footer>
            
          <StepBackwardOutlined className="iconFont"/>
          <div className="play" onClick={playFn.bind(this,setPlay,!play)}>
            {
                Conctrl(play)
            }
          </div>
          <StepForwardOutlined className="iconFont"/>
        </Footer>
      </Layout>
    </Layout>

    </div>
  );
}


export default App;
