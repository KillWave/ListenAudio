const audioCtx = new AudioContext();
const source = audioCtx.createBufferSource();

export default {
    audioCtx,
    source,
    page : {
        p:1,
        n:10
      },
      list:[]
}