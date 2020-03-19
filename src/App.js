import React,{ useState,useEffect} from 'react';
import { Layout } from 'antd'
import './css/base.css'
import { StepBackwardOutlined, StepForwardOutlined, CaretRightOutlined ,PauseOutlined} from '@ant-design/icons';
import axios from 'axios'
const { Header, Footer, Content } = Layout;
const guid = 126548448;
const audioCtx = new AudioContext();
let source = audioCtx.createBufferSource();
let isStart = true;
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
function init(){
  //获取音乐key
 axios.get("/vkey?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400003lghpv0jfFXG.m4a&guid="+guid).then(res=>{
   let data = res.data.data;
    data.items.forEach(item=>{
      console.log(`/${item.filename}?fromtag=0&guid=${guid}&vkey=${item.vkey}`)
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
function App() {
  let [play,setPlay ] = useState(false);
  useEffect(()=>{
    init();
  },[]);

  return (
    <div className="App">
     <Layout>
      <Header>Header</Header>
      <Content>
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
