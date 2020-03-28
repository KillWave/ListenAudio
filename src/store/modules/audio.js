export default {
    setBuffer(state, playload){
        return {...state,bufferArr:playload}
    },
    setAudio(state, playload){
        return {...state,audio:playload}
    },
    setMusicList(state, playload){
        return {...state,musicList:playload}
    },
    setCurrentMusic(state, playload){
        return {...state,currentMusic:playload}
    },
    setIndex(state, playload){
        return {...state,index:playload}
    },
    
    
}