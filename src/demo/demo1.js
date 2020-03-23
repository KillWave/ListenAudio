import React,{useEffect,useContext} from 'react'
import {StoreContext} from '../store'
import Demo2 from './demo2'
export default ()=>{
    const {store,setStore,fn} =  useContext(StoreContext);
    useEffect(fn)
    return (
        <>
        {store.count}
        <button onClick={()=>{setStore({count:store.count+1})}}>click me</button>
        <Demo2></Demo2>

        </>
    )
}