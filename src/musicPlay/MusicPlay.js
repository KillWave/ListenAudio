import React,{useState,useContext,useEffect} from 'react'
import {StoreContext} from '../store'
import { Layout } from 'antd'
import '../css/play.css'
import { StepBackwardOutlined, StepForwardOutlined, CaretRightOutlined ,PauseOutlined } from '@ant-design/icons';
const { Footer } = Layout;
let isStart = true;
function playFn(setPlay,play,store){
    setPlay(play);
    if(play){
      if(isStart){
        store.source.start(0);
        isStart = false;
      }else{
        store.audioCtx.resume()
      }
     
    }else{
        store.audioCtx.suspend()
    }
    
  }
  function Conctrl(bool){
    if(bool){
      return  <PauseOutlined className="iconFont"/>
     
    }else{
      return  <CaretRightOutlined className="iconFont" />
    }
  }

export default ()=>{
    const {store} =  useContext(StoreContext)
    const [ play,setPlay ] = useState(store.isPlay);
    // useEffect(fn);
    useEffect(()=>{
      setPlay(store.isPlay)
  },[store.isPlay])
    console.log(play,store.isPlay);
    return (
        <>
        <Footer>
        <StepBackwardOutlined className="iconFont"/>
          <div className="play" onClick={()=>{playFn(setPlay,!play,store)}}>
            {
                Conctrl(play)
            }
          </div>
          <StepForwardOutlined className="iconFont"/>
        </Footer>
        </>
    )
}