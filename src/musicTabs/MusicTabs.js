import React, { useContext, useState, useEffect } from 'react'


import SearchResult from '../searchResult/SearchResult'
import Recommend from '../recommend/recommend.jsx'
import { StoreContext } from '../store'
import Lyric from '../lyric/lyric'
import { Layout, Tabs } from 'antd'
const { TabPane } = Tabs;
const { Content } = Layout;

export default () => {
  const { state, dispatch } = useContext(StoreContext)
  // const [ActiveKey, setActiveKey] = useState(state.ActiveKey);
  // useEffect(() => {
  //   setActiveKey(state.ActiveKey)
  // }, [state.ActiveKey]);
  return (
    <>
      <Content>

        <Tabs  size="large">
          <TabPane tab="推荐" key="1" >
            <Recommend />
          </TabPane>
          <TabPane tab="搜索结果" key="2" >
            <SearchResult></SearchResult>
          </TabPane>
          <TabPane tab="歌词" key="3">
            <Lyric></Lyric>
          </TabPane>
        </Tabs>
      </Content>
    </>
  )
}