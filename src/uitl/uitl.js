import api from '../api'
function clickVkey(data) {
    const guid = 126548448;
    const songmid = data.songmid;
    const filename = "C400" + data.songmid + ".m4a";
    const url = `/vkey?format=json205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=${filename}&guid=${guid}`;
    return url;
}

export function clickPlay(data, state, dispatch) {
    const audio = state.audio;
    const vkey = clickVkey(data);

    api.music(vkey, (url) => {
        audio.src = url;
        dispatch({ type: "setCurrentMusic", playload: data })
        dispatch({ type: "setAudio", playload: audio })
        dispatch({ type: "playAuto", playload: true });
        audio.play();
    },state, dispatch)



}
export function s_to_hs(s){
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    var h;
    h  =   Math.floor(s/60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    s  =   s%60;
    //将变量转换为字符串
    h    +=    '';
    s    +=    '';
    //如果只有一位数，前面增加一个0
    h  =   (h.length==1)?'0'+h:h;
    s  =   (s.length==1)?'0'+s:s;
    return h+':'+Math.ceil(s);
}


export function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh";
    u.rate = 1;
    speechSynthesis.speak(u);
}

