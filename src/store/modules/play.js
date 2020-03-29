export default {

    playAuto(state, playload) {
        return { ...state, isPlay: playload }
    },
    setHistoryListPush(state, playload) {
        return { ...state, historyList: [...state.historyList,...playload] }
    },
    notFount(state, playload) {
        return { ...state, notFount: playload }
    },
}