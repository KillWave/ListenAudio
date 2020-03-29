import React, { useState, useContext, useEffect } from 'react'
import { Slider } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { StoreContext } from '../store'
import Conctrl from "./Conctrl"
import { Layout } from 'antd'
import '../css/play.css'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { clickPlay } from "../uitl/uitl"
const { Footer } = Layout;

function playFn(state, play) {
  if (state.audio.src) {
    if (play) {
      state.audio.play()
    } else {
      state.audio.pause()
    }
  }


}

export default () => {
  const { state, dispatch } = useContext(StoreContext)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0);
  const [details, setDetails] = useState({});
  const index = state.index;
  const playNext = () => {
    if (index === -1) return;
    const nextIndex = index + 1 <= state.musicList.length - 1 ? index + 1 : 0;
    return nextIndex;
  }
  const playPrevious = () => {
    if (index === -1) return;
    const previousIndex = index - 1 >= 0 ? index - 1 : state.musicList.length - 1;
    return previousIndex;
  }
  const playNextMusic = () => {
    const index = playNext();
    if (index !== undefined) dispatch({ type: "setIndex", playload: index });
    clickPlay(state.musicList[index], state, dispatch);

  }
  state.audio.oncanplay = function () {
    setDuration(this.duration);
    setVolume(this.volume);
  }
  state.audio.ontimeupdate = function (e) {
    // 更新时间和进度条 (默认一秒会执行多次 需要处理一秒只执行一次更新)
    let time = 0;

    if (parseInt(e.target.currentTime) !== Number(time)) {
      time = parseInt(e.target.currentTime);
      setCurrentTime(time);
    }
  }
  state.audio.onended = function () {
    setPlay(!play);
    playNextMusic();

  }
  const progressChange = (value) => {
    state.audio.currentTime = value;
    setCurrentTime(state.audio.currentTime);
  }
  const volumeChange = (v) => {
    state.audio.volume = v;
    setVolume(v);
  }

  useEffect(() => {
    if (state.isPlay) {
      setPlay(true)
      playFn(state, true);
    }
  }, [state.isPlay])
  useEffect(() => {
    if (state.isPlay !== play) {
      dispatch({ type: "playAuto", playload: play })
      playFn(state, play);
    }
  }, [play])
  useEffect(() => {
    if (state.currentMusic) {
      setDetails(state.currentMusic);
    }
  }, [state.currentMusic])
  useEffect(()=>{
    if(state.notFount){
      playNextMusic();
    }
    
  },[state.notFount])
  return (
    <>
      <Footer className="ds-flex">
        <div>
          <StepBackwardOutlined className="iconFont" onClick={() => {
            const index = playPrevious();
            if (index !== undefined) dispatch({ type: "setIndex", playload: index });
            clickPlay(state.musicList[index], state, dispatch);

          }} />
          <div className="play" onClick={() => { setPlay(!play) }}>
            <Conctrl bool={play}></Conctrl>
          </div>
          <StepForwardOutlined className="iconFont" onClick={() => {
            playNextMusic();
          }} />
        </div>
        <div className="ds-f1">
          <div className="ds-details">
            <span> {currentTime >= 60 ? (currentTime / 60).toFixed(2) + "分" : currentTime + '秒'} / {duration >= 60 ? (duration / 60).toFixed(2) + "分" : duration + '秒'}  </span>
            <span>{details.songname}</span>

          </div>
          <Slider tipFormatter={(speek) => {
            if (speek >= 60) {
              return (speek / 60).toFixed(2) + "分"
            } else {
              return speek + "秒"
            }
          }} value={currentTime} tooltipVisible max={duration} onChange={progressChange} />
        </div>
        <div className="volume ds-flex">
          <SoundOutlined className="volume-icon" />
          <Slider className="ds-f1" tipFormatter={(speek) => {
            return speek * 10;
          }} min={0} max={1} step={0.1} value={volume} tooltipVisible onChange={volumeChange} />
        </div>

      </Footer>
    </>
  )
}