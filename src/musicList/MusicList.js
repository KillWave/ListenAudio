import React, { useEffect, useContext, useState } from 'react'
import { StoreContext } from '../store'
import { Layout, Menu } from 'antd'
import { PicRightOutlined } from '@ant-design/icons';
import { clickPlay } from "../uitl/uitl"
import '../css/musicList.css'
const { SubMenu } = Menu;

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

                            list.map(item => {
                                return <Menu.Item className="ant-list-item list-item-bg" key={item.albummid} onClick={() => {
                                    dispatch({ type: "setIndex", playload: foundIndex(item) })
                                    clickPlay(item, state, dispatch);
                                    dispatch({ type: "setMusicList", playload: list });
                                }}>{item.songname}</Menu.Item>
                            })
                        }

                    </SubMenu>
                </Menu>


            </Sider>
        </>
    )
}