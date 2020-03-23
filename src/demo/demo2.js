import React,{useEffect,useContext} from 'react'
import {StoreContext} from '../store'

export default ()=>{
    const {store,setStore,fn} =  useContext(StoreContext);
    useEffect(fn)
    return (
        <>
        demo2
        {store.count}
        

        </>
    )
}