import React,{ useState,useEffect} from 'react';
import './css/base.css'
import axios from 'axios'
import { Layout,Input,List } from 'antd'
import { StepBackwardOutlined, StepForwardOutlined, CaretRightOutlined ,PauseOutlined } from '@ant-design/icons';
const { Header, Footer, Content } = Layout;
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
      console.log(item)
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
function init(){
  //获取音乐key
  const url = "/vkey?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400003lghpv0jfFXG.m4a&guid="+guid;
  music(url,guid);

}
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
function App() {
  let [ play,setPlay ] = useState(false);
  let [ data,setData ] = useState([]);
  // useEffect(()=>{
  //   init();
  // },[]);

  return (
    <div className="App">
     <Layout>
      <Header>Header</Header>
      <Content>
      <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      onSearch={value => (search(value,setData))}
    />
       <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item onClick={clickResult.bind(this,item)}>
          {item.songname}
        </List.Item>
      )}
    />
      <StepBackwardOutlined className="iconFont"/>
      <div className="play" onClick={playFn.bind(this,setPlay,!play)}>
        {
            Conctrl(play)
        }
      </div>
      <StepForwardOutlined className="iconFont"/>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
    </div>
  );
}


export default App;
