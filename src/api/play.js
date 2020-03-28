import axios from 'axios'
import { speak } from '../uitl/uitl'
/*
更据key获得ma4音乐文件并且返回buf
*/
import {clickPlay} from "../uitl/uitl"

export function music(url,cb,state,dispatch){
    const guid = 126548448; 
    axios.get(url).then(res=>{
        let data = res.data.data;
         data.items.forEach(item=>{
             if(item.vkey !== ""){
                 cb(`/mp3/${item.filename}?fromtag=0&guid=${guid}&vkey=${item.vkey}`);
             }else{
                speak("找不到歌曲资源");
                const index = state.index;
                const playNext = () => {
                    if (index === -1) return;
                    const nextIndex = index + 1 <= state.musicList.length - 1 ? index + 1 : 0;
                    return nextIndex;
                  }
                  const playNextMusic = () => {
                    const index = playNext();
                    if (index !== undefined) dispatch({ type: "setIndex", playload: index });
                    clickPlay(state.musicList[index], state, dispatch);
                
                  }
                  playNextMusic();
             }    
        })
      })
}


