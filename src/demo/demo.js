import React ,{useContext,createContext,useReducer} from 'react'


//状态管理
//createContext

//export 
const ColorContext = createContext({})
//export
const UPDATE_COLOR = "UPDATE_COLOR"
const reducer = (state,action)=>{
    switch(action.type){
        case UPDATE_COLOR :
            return action.color
        default:
            return state
    }

}
//export 
//useReducer
const Color = props=>{
    const [color,dispatch] = useReducer(reducer,"blue")
    return (
    <ColorContext.Provider value={{color,dispatch}}>
        {props.children}
    </ColorContext.Provider>
    )
}


//展示组件
//useContext ColorContext
function ShowArea(){
    const { color } = useContext(ColorContext)
    return (<div style={{color:color}}>字体颜色</div>)
}
//按钮组件
//useContext 
function Buttons(){
    const {dispatch} = useContext(ColorContext);
    return (
        <>
            <button onClick={()=>{dispatch({type:UPDATE_COLOR,color:"red"})}}>红色</button>
            <button onClick={()=>{dispatch({type:UPDATE_COLOR,color:"yellow"})}}>黄色</button>
        </>
    )
}



export default ()=>{


    return(
        < >
        <Color>
            <ShowArea/>
            <Buttons/>
        </Color>
            
        </>
    )
}