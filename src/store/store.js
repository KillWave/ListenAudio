const audioCtx = new AudioContext();
// const source = audioCtx.createBufferSource();

export default {
    audioCtx,
    source:null,
    page : {
        p:1,
        n:12
      },
      list:[],
      world:"",
      isPlay:false
}