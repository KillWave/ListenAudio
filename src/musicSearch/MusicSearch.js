import React,{useState,useEffect,useContext} from 'react'
import api from '../api'
import '../css/search.css'
import {StoreContext} from '../store'
import Sugger from './Sugger'
import { Layout,Input } from 'antd'
const { Search } = Input;
const { Header } = Layout;
//分页
let page = {
    p:1,
    n:10
  }
function search(val,setData){
    /*
      p：页数，从1开始
      n：每一页显示的条数
      w：搜索关键字
    */
   if(val !== ""){
        api.search({...page,world:val},(data)=>{
            setData(eval(data));
        })
   }
   

  }
  function callback(data){
    const list = data.data.song.list;
    return list;
  }
//   function menu(data){
//     return (<Menu selectable={false} >
//       {
//         data.map((item,index)=>{
//             //songname_hilight
//         return (<Menu.Item key={index}>{  item.songname } </Menu.Item>)
//         })
//       }
//     </Menu>)
  
//   }
  //获取音乐
// function music(url,guid){

//     axios.get(url).then(res=>{
//       let data = res.data.data;
//        data.items.forEach(item=>{
//          fetch(`/mp3/${item.filename}?fromtag=0&guid=${guid}&vkey=${item.vkey}`,{
//            method: 'get',
//            responseType: 'arraybuffer'
//        }).then(res => {     
//            return res.arrayBuffer();
//        }).then(buf => {
//          audioCtx.decodeAudioData(buf).then((decodedData)=>{
//          source.buffer = decodedData;
//          source.connect(audioCtx.destination);
//          source.loop = true;
//          })
//        })
//       })
//     })
//   }
//   function clickResult(val){
//     const songmid = val.songmid;
//     const filename = "C400"+val.songmid+".m4a";
//     const url = `/vkey?format=json205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=${filename}&guid=${guid}`;
//     music(url,guid);
//   }
let refFn;
let isShow;
function sugger(isshow,ref){
    isShow = isshow;
    refFn = ref;
    return isshow;
}
export default ()=>{
  const {setStore} =  useContext(StoreContext);
    const [ data,setData ] = useState([]);
    const [searchVal,setSearchVal] = useState("");
    useEffect(()=>{
      if(searchVal === ""){
        refFn(false)
      }

    },[searchVal])

    return (
            <Header>
                <div className="sugger">
                    <Search
                    placeholder="input search text"
                    onChange={(e)=>{setSearchVal(e.target.value);search(e.target.value,setData);!isShow && refFn(true)}}
                    onSearch={value => {setSearchVal(value);search(value,setData);refFn(false);setStore({world:value})}}
                    onFocus={(e)=>{setSearchVal(e.target.value);search(e.target.value,setData);!isShow && refFn(true)}}
                    value={searchVal}
                    />
                    <Sugger onRef={sugger} setValue={{dispatch:setSearchVal,search}} setDataFn={setData} list={data}></Sugger>
                </div>    
            </Header>
       
    )
}