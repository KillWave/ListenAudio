import React,{useState,useContext,useEffect} from 'react'
import {StoreContext} from '../store'
import { Layout } from 'antd'
import '../css/play.css'
import { StepBackwardOutlined, StepForwardOutlined, CaretRightOutlined ,PauseOutlined } from '@ant-design/icons';
const { Footer } = Layout;
function playFn(store){
    if(store.source === null){
      return
    }
    store.source.connect(store.audioCtx.destination);
    // const state = store.audioCtx.state;
    console.log(store.isPlay);
    if(store.isPlay){
      
      // console.log(state)
      // if(state === 'running'){  
        store.source.start(0);
      //   console.log(11)
      // }else{
      //   store.audioCtx.resume()
      // }
    }else{
        store.audioCtx.suspend()
    }
    
  }
  function Conctrl(props){

    if(props.bool){
      return  <PauseOutlined className="iconFont"/>
     
    }else{
      return  <CaretRightOutlined className="iconFont" />
    }
  }

export default ()=>{
    const {store,setStore,fn} =  useContext(StoreContext)
    const [ play,setPlay ] = useState(false);
    useEffect(fn);
    useEffect(()=>{
      if(store.source){
        setPlay(store.isPlay)
        playFn(store);
      }
    },[store.source])
    useEffect(()=>{
      if(store.isPlay !== play){
        setStore({isPlay:play})
        console.log(store.isPlay)
        //playFn(store);
      }
    },[play])

    return (
        <>
        <Footer>
        <StepBackwardOutlined className="iconFont"/>
          <div className="play" onClick={()=>{setPlay(!play)}}>
           <Conctrl bool={play}></Conctrl>
          </div>
          <StepForwardOutlined className="iconFont"/>
        </Footer>
        </>
    )
}