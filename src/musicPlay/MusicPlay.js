import React,{useState,useContext,useEffect} from 'react'
import {StoreContext} from '../store'
import Conctrl from "./Conctrl"
import { Layout } from 'antd'
import '../css/play.css'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
const { Footer } = Layout;
let index = 0;
  function playFn(store,play){
    if(store.source === null){
      return
    }
    store.source.connect(store.audioCtx.destination);
    if(play){
       if(index === 0){  
        store.source.start(0);
       }else{
         store.audioCtx.resume()
      }
    }else{
        store.audioCtx.suspend()
    }
    
  }


export default ()=>{
    const {store,setStore,fn} =  useContext(StoreContext)
    const [ play,setPlay ] = useState(false);
    useEffect(fn);
    useEffect(()=>{
      if(store.source){
        setPlay(true)
        playFn(store,true);
      }
    },[store.source])
    useEffect(()=>{
      if(store.isPlay !== play){
        index = 1;
        setStore({isPlay:play})
        playFn(store,play);
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