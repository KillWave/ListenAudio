import React, { useState, useContext, useEffect } from 'react'
import { Slider } from 'antd';
import { StoreContext } from '../store'
import Conctrl from "./Conctrl"
import { Layout } from 'antd'
import '../css/play.css'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
const { Footer } = Layout;
function playFn(state, play) {
  if (play) {
    state.audio.play()
  } else {
    state.audio.pause()
  }

}
function onChange(value) {
  console.log('onChange: ', value);
}

function onAfterChange(value) {
  console.log('onAfterChange: ', value);
}

export default () => {
  const { state, dispatch } = useContext(StoreContext)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration,setDuration] = useState(0)
  const [play, setPlay] = useState(false);
  state.audio.oncanplay = function () {
    setDuration(this.duration);
  }
  state.audio.ontimeupdate = function (e) {
    // 更新时间和进度条 (默认一秒会执行多次 需要处理一秒只执行一次更新)
    let time = 0;
   
    if (parseInt(e.target.currentTime) !== Number(time)) {
      time = parseInt(e.target.currentTime);
      setCurrentTime(time);
      // console.log(time);
      // const timeRanges = state.audio.buffered
      // // 获取已缓存的时间  timeRanges.end(timeRanges.length - 1)

      // // 计算百分比 展示进度
      // const speed = parseInt(timeRanges.end(timeRanges.length - 1) * 100 / state.audio.duration * 100) / 100;
    
      // console.log(speed);

    }
  }
  //timeupdate
  // state.audio.currentTime



  useEffect(() => {
    if (state.isPlay) {
      setPlay(true)
      playFn(state, true);
    }
  }, [state.isPlay])
  useEffect(() => {
    if (state.isPlay !== play) {
      dispatch({ type: "playAuto", playLoad: play })
      playFn(state, play);
    }
  }, [play])

  return (
    <>
      <Footer className="ds-flex">
        <div>
          <StepBackwardOutlined className="iconFont" />
          <div className="play" onClick={() => { setPlay(!play) }}>
            <Conctrl bool={play}></Conctrl>
          </div>
          <StepForwardOutlined className="iconFont" />
        </div>
        <div className="ds-f1">
          <Slider value={currentTime} max={duration} onChange={onChange} onAfterChange={onAfterChange} />
        </div>


      </Footer>
    </>
  )
}