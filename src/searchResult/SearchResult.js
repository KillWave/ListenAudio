import React,{useContext,useState, useEffect, useMemo} from 'react'
import api from '../api'
import { List  } from 'antd';
import {StoreContext} from '../store'
import { clickVkey } from '../uitl/uitl'

function callback(data){
    return data;
}
function clickPlay(data,audio,source){
    const vkey = clickVkey(data);
    api.music(vkey,(buf)=>{
           audio.decodeAudioData(buf).then((decodedData)=>{
                source.buffer = decodedData;
                source.connect(audio.destination);
                source.loop = true;
                source.start(0);
           })
    })
}

export default ()=>{
    const {store} =  useContext(StoreContext);
    const [data,setData] = useState({});
    const [list,setList] = useState([]);
    const [totalnum,setTotalnum] = useState(0);
    const [storeN] = useState(store.page.n)
    useEffect(()=>{
        if(store.world !== ""){
            api.search({...store.page,world:store.world},(data)=>{
                setData(eval(data));
            })
        }
       
    },[store.world]);
    useEffect(()=>{
        if(data.data !== undefined){
            setList(data.data.song.list)
            setTotalnum(data.data.song.totalnum);
        }
    },[data])
    const {world} = useState(store.world);
    const WorldFn = ()=>{
        if(world !== "" && data.data){
            return <div>{world}共找到:{data.data.song.totalnum}匹配项</div>
        }
        return <div>请搜索</div>
      
    }
    const cacheWorld =  useMemo(()=>WorldFn())
    return (
        <>
        <List
        size="large"
        bordered
        pagination={{
            defaultPageSize:storeN,
            hideOnSinglePage:true,
            total:totalnum,
            onChange(page, pageSize){
                api.search({p:page,n:pageSize,world:store.world},(data)=>{
                    setData(eval(data));
                })
            }
        }}
        header={cacheWorld}
        dataSource={list}
        renderItem={item => <List.Item onClick={()=>{clickPlay(item,store.audioCtx,store.source)}}>{item.songname}</List.Item>}
        />
      

        </>
    )
}