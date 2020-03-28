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



export function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh";
    u.rate = 1;
    speechSynthesis.speak(u);
}

