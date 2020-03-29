import React, { useContext, useState, useEffect, useMemo } from 'react'
import api from '../api'
import { List } from 'antd';
import { StoreContext } from '../store'
import { clickPlay } from '../uitl/uitl'
function callback(data) {
    return data;
}


export default () => {
    const { state, dispatch } = useContext(StoreContext);
    const [data, setData] = useState({});
    const [list, setList] = useState([]);
    const [totalnum, setTotalnum] = useState(0);
    const [stateN] = useState(state.page.n);
    const [current,setCurrent] = useState(1);
    useEffect(() => {
        if (state.word !== "") {
            api.search({ ...state.page, word: state.word }, (data) => {
                setData(eval(data));
                setCurrent(1);
                dispatch({ type: "setMusicList", playload: eval(data).data.song.list });
            })
        }
    }, [state.word]);

    useEffect(() => {
        if (data.data !== undefined) {
            setList(data.data.song.list)
            setTotalnum(data.data.song.totalnum);
        }
    }, [data]);
    const { word } = useState(state.word);
    const wordFn = () => {
        if (word !== "" && data.data) {
            return <div>{word}共找到:{data.data.song.totalnum}匹配项</div>
        }
        return <div>请搜索</div>

    }
    const foundIndex = (music) => {
        return eval(data).data.song.list.findIndex(item => music.docid === item.docid)
    }
    const foundHistory = (item) => {
        if (state.historyList.length > 1) {
            const music = state.historyList.find(music => item.docid === music.docid);
            if (music === undefined) {
                dispatch({ type: "setHistoryListPush", playload: [item] });
            }
        } else {
            dispatch({ type: "setHistoryListPush", playload: [item] });

        }


    }
    const cacheword = useMemo(() => wordFn())
    return (
        <>
            <List
                size="large"
                bordered
                pagination={{
                    current:current,
                    defaultPageSize: stateN,
                    hideOnSinglePage: true,
                    total: totalnum,
                    onChange(page, pageSize) {
                        setCurrent(page);
                        api.search({ p: page, n: pageSize, word: state.word }, (data) => {
                            setData(eval(data));
                        })
                    }
                }}
                header={cacheword}
                dataSource={list}
                renderItem={item => <List.Item onClick={() => { foundHistory(item); dispatch({ type: "setIndex", playload: foundIndex(item) }); clickPlay(item, state, dispatch) }}>{item.songname}</List.Item>}
            />


        </>
    )
}