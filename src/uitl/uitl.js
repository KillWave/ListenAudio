import api from '../api'
function clickVkey(data){
    const guid = 126548448;
    const songmid = data.songmid;
    const filename = "C400"+data.songmid+".m4a";
    const url = `/vkey?format=json205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=${filename}&guid=${guid}`;
    return url;
}

export function clickPlay(data,store,setStore){
    const audio = store.audioCtx;
    if(store.source !== null){
        store.source.stop();
        setStore({isPlay:false})
    }
    const vkey = clickVkey(data);
    api.music(vkey,(buf)=>{
        const source = audio.createBufferSource();
        audio.decodeAudioData(buf).then((decodedData)=>{
            source.buffer = decodedData;
            setStore({isPlay:true})
            setStore({source})
           
        })
          
    })
}