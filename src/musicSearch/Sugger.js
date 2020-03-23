import React,{useState,useEffect,useContext,useMemo} from 'react'

import {StoreContext} from '../store'
import "../uitl/uitl"
export default (props)=>{
    const { list ,setValue,setDataFn,onRef} = props;
    const [isShow, isShowFn] = useState(true);
    const storeObject =  useContext(StoreContext);
    const setStore = storeObject.setStore;
    const watch = storeObject.fn;
    useEffect(watch);
    useMemo(()=> onRef(isShow,isShowFn),[isShow])

    return ( 
        <div className="seachResult">
        {
           isShow ? list.map((item,key)=>{
                return (<div className="suggersItem" key={key} onClick={
                    ()=>{
                        setValue.dispatch(item.songname);
                        setValue.search(item.songname,setDataFn) 
                        isShowFn(false);
                        setStore({list:list})
                    }
            }>{item.songname}</div>)
            }) : []
        }
        </div>
    )

}