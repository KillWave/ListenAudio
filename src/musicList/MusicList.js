import React, { useEffect, useContext, useState } from 'react'
import { StoreContext } from '../store'
import { Layout } from 'antd'
import { clickPlay } from "../uitl/uitl"
import '../css/musicList.css'
const { Sider } = Layout;
export default () => {
    const { state, dispatch } = useContext(StoreContext);
    const [list, setList] = useState([]);
    useEffect(() => {
        const historyList = localStorage.getItem("historyList");
        dispatch({ type: "setMusicList", playload: JSON.parse(historyList) });
        if (historyList) {
            dispatch({ type: "setHistoryListPush", playload: JSON.parse(historyList) })
        }
    }, [])
    useEffect(() => {
        if (state.historyList.length) {  
            localStorage.setItem("historyList", JSON.stringify(state.historyList));
            setList(state.historyList);
        }
    }, [state.historyList])

    return (
        <>
            <Sider width={360}>
                <div className="music-list-header">

                </div>
                {

                    list.map(item => {
                        return <div className="ant-list-item list-item-bg" key={item.docid} onClick={() => {
                            clickPlay(item, state, dispatch);
                            
                            dispatch({type:"resetHistoryList",playload:list})
                            
                        }}>{item.songname}</div>
                    })
                }

            </Sider>
        </>
    )
}