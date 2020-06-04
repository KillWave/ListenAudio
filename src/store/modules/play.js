export default {

    playAuto(state, playload) {
        return { ...state, isPlay: playload }
    },
    setHistoryListPush(state, playload) {
        return { ...state, historyList: [...state.historyList,...playload] }
    },
    setHistoryList(state, playload) {
        return { ...state, historyList: [...playload] }
    },
    notFount(state, playload) {
        return { ...state, notFount: playload }
    },
    setLyric(state, playload) {
        return { ...state, lyric: playload }
    },
    setCurrentTime(state, playload) {
        return { ...state, currentTime: playload }
    },
    setActiveKey(state, playload) {
        return { ...state, ActiveKey: playload }
    }
}