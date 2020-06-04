import React, { useEffect, useContext, useState } from 'react'
import { StoreContext } from '../store'
import { Layout, Menu } from 'antd'
import { PicRightOutlined, CloseOutlined } from '@ant-design/icons';
import { clickPlay } from "../uitl/uitl"
import '../css/musicList.css'
const { SubMenu } = Menu;

const { Sider } = Layout;
export default () => {
    const { state, dispatch } = useContext(StoreContext);
    const [list, setList] = useState([]);
    const [flagList, setFlagList] = useState([]);

    function isClose(index) {
        if (flagList[index]) {
            return <CloseOutlined onClick={function(e){
                e.stopPropagation();
                state.historyList.splice(index,1);
                localStorage.setItem("historyList", JSON.stringify(state.historyList));
                setList(state.historyList);
                dispatch({ type: "setHistoryList", playload: state.historyList })
            }}/>
        }

    }
    useEffect(() => {
        const historyList = localStorage.getItem("historyList");
        dispatch({ type: "setMusicList", playload: JSON.parse(historyList) });
        if (historyList) {
            dispatch({ type: "setHistoryListPush", playload: JSON.parse(historyList) })
        }
    }, [])
    useEffect(() => {
        if (state.historyList.length) {
            console.log(state.historyList)
            localStorage.setItem("historyList", JSON.stringify(state.historyList));
            setList(state.historyList);
            setFlagList(new Array(state.historyList.length).fill(false));
        }
    }, [state.historyList])
    const foundIndex = (music) => {
        return list.findIndex(item => music.docid === item.docid)
    }

    return (
        <>
            <Sider width={360}>
                <div className="music-list-header">

                </div>
                <Menu
                    defaultSelectedKeys={['historyList']}
                    defaultOpenKeys={['historyList']}
                    mode="inline"
                    className="history-menu"
                >
                    <SubMenu
                        key="historyList"
                        title={
                            <span>
                                <PicRightOutlined />
                                <span>默认列表</span>
                            </span>
                        }
                    >
                        {

                            list.map((item,index) => {
                                return <Menu.Item className="ant-list-item list-item-bg" key={item.songmid} onClick={function() {           
                                    dispatch({ type: "setIndex", playload: foundIndex(item) })
                                    clickPlay(item, state, dispatch);
                                    dispatch({ type: "setMusicList", playload: list });
                                }} onMouseEnter={() => {
                                    const listActive = flagList.map((item,i)=>{
                                        if(i === index){
                                            return true;
                                        }
                                    })
                                    setFlagList(listActive);

                                }} onMouseLeave={() => {
                                    const listActive = flagList.map((item,i)=>{
                                        if(i === index){
                                            return false;
                                        }
                                    })
                                    setFlagList(listActive);
                                }}>{item.songname}
                                {isClose(index)} </Menu.Item>
                            })
                        }

                    </SubMenu>
                </Menu>


            </Sider>
        </>
    )
}