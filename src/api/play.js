import axios from 'axios'
import { speak } from '../uitl/uitl'
const instance = axios.create({
  timeout:2000,
  headers:{
    'Content-Type':"application/x-www-form-urlencoded"
  }
})
/*
更据key获得ma4音乐文件并且返回buf
*/

export function music(url, cb, state, dispatch) {
  const guid = 126548448;
  axios.get(url).then(res => {
    let data = res.data.data;
    data.items.forEach(item => {
      if (item.vkey.length) {
        dispatch({ type: "notFount", playload: 0 })
        cb(`/mp3/${item.filename}?fromtag=0&guid=${guid}&vkey=${item.vkey}`);
      } else {
        dispatch({ type: "notFount", playload: state.notFount+1})
        speak("找不到歌曲资源");
      }
    })
  })
}

export function lyric(args,cb){
 
  instance.get("/lyric",{
    params:{
      songmid:args.songmid,
      format:"json",
      nobase64:1
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
  }
  }).then(res=>{
    cb(res);
  })
}


