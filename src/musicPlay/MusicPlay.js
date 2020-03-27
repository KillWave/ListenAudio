import React, { useState, useContext, useEffect } from 'react'
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


export default () => {
  const { state, dispatch } = useContext(StoreContext)
  const [play, setPlay] = useState(false);
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
      <Footer>
        <StepBackwardOutlined className="iconFont" />
        <div className="play" onClick={() => { setPlay(!play) }}>
          <Conctrl bool={play}></Conctrl>
        </div>
        <StepForwardOutlined className="iconFont" />
      </Footer>
    </>
  )
}