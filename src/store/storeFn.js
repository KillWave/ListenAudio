import play from './modules/play'
import search from './modules/search'
import sugger from './modules/sugger'
import audio from './modules/audio'
export default {
    ...play,
    ...search,
    ...sugger,
    ...audio
};