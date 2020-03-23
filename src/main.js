import React from 'react'
import {Store} from './store'
import { Layout } from 'antd'
import MusicList from './musicList/MusicList'
import MusicSearch from './musicSearch/MusicSearch'
import MusicTabs from "./musicTabs/MusicTabs"
import MusicPlay from "./musicPlay/MusicPlay"
export default ()=>{
    return (
        <Store>
           <Layout>
               <MusicList></MusicList>
               <Layout>
                   <MusicSearch></MusicSearch>
                   <MusicTabs></MusicTabs>
                   <MusicPlay></MusicPlay>
               </Layout>
           </Layout>
        </Store>
        )
}