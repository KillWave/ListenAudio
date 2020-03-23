import React,{createContext,useState} from 'react'
import useGlobalHook from './useStore'
import initialState from './store'
export const StoreContext =  createContext({})
export const Store =  (props)=>{
    const [store,setStore,fn] = useGlobalHook(initialState,useState)();
    return (
        <StoreContext.Provider value={{store,setStore,fn}}>
            {props.children}
        </StoreContext.Provider>
    )
}