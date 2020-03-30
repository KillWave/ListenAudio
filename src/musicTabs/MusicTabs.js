import React,{} from 'react'


import SearchResult from '../searchResult/SearchResult'
import Lyric from '../lyric/lyric'
import { Layout,Tabs } from 'antd'
const { TabPane } = Tabs;
const { Content } = Layout;

export default ()=>{


    return (
        <>
        <Content>
            
        <Tabs defaultActiveKey="3" size="large">
          <TabPane tab="推荐" key="1">
            Content of tab 1
          </TabPane>
          <TabPane tab="搜索结果" key="2">
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