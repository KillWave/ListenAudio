import React, { useState, useEffect, useContext } from 'react'
import api from '../api'
import '../css/search.css'
import { StoreContext } from '../store'
import Sugger from './Sugger'
import { Layout, Input } from 'antd'
const { Search } = Input;
const { Header } = Layout;
//分页
let page = {
  p: 1,
  n: 10
}
function search(val, setData) {
  /*
    p：页数，从1开始
    n：每一页显示的条数
    w：搜索关键字
  */
  if (val !== "") {

    api.search({ ...page, word: val }, (data) => {
      setData(eval(data));
    })
  }


}
function callback(data) {
  const list = data.data.song.list;
  return list;
}
let refFn;
let isShow;
function sugger(isshow, ref) {
  isShow = isshow;
  refFn = ref;
  return isshow;
}
export default () => {
  const { dispatch } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    if (searchVal === "") {
      refFn(false)
    }

  }, [searchVal])

  return (
    <Header>
      <div className="sugger">
        <Search
          placeholder="请输入搜索关键词"
          onChange={(e) => { setSearchVal(e.target.value); search(e.target.value, setData); !isShow && refFn(true) }}
          onSearch={value => { setSearchVal(value); search(value, setData); refFn(false); dispatch({ type: "setWord", playload: value }) }}
          onFocus={(e) => { setSearchVal(e.target.value); search(e.target.value, setData); !isShow && refFn(true) }}
          onBlur={()=>{setTimeout(()=>{refFn(false)},200) }}
          value={searchVal}
        />
        <Sugger onRef={sugger} setValue={{ dispatch: setSearchVal, search }} setDataFn={setData} list={data}></Sugger>
      </div>
    </Header>

  )
}