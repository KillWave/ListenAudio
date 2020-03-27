import axios from 'axios'
import { speak } from '../uitl/uitl'
/*
更据key获得ma4音乐文件并且返回buf
*/

export function music(url,cb){
    const guid = 126548448; 
    axios.get(url).then(res=>{
        let data = res.data.data;
         data.items.forEach(item=>{
             if(item.vkey !== ""){
                 cb(`/mp3/${item.filename}?fromtag=0&guid=${guid}&vkey=${item.vkey}`);
             }else{
                speak("找不到歌曲资源")
             }    
        })
      })
}


