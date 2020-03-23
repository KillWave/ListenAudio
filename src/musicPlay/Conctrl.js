import React,{useContext} from "react"
import {StoreContext} from '../store'
import { CaretRightOutlined ,PauseOutlined } from '@ant-design/icons';
export default function Conctrl(props){
    const {setStore} =  useContext(StoreContext)
    // useEffect(fn);
    setStore({isPlay:props.bool})
    if(props.bool){
      return  <PauseOutlined className="iconFont"/>
     
    }else{
      return  <CaretRightOutlined className="iconFont" />
    }
  }