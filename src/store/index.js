import React,{createContext,useReducer} from 'react'
import initialState from './store'
import actionFn from './storeFn'
export const StoreContext =  createContext({})
export const Store =  (props)=>{
    const [state, dispatch] = useReducer((state, action) => {
        return actionFn[action.type](state,action.playload)
    },initialState)
    return (
        <StoreContext.Provider value={{state,dispatch}}>
            {props.children}
        </StoreContext.Provider>
    )
}