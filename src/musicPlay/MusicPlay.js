import React, { useState, useContext, useEffect } from 'react'
import { Slider, Modal, Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { StoreContext } from '../store'
import Conctrl from "./Conctrl"
import { Layout } from 'antd'
import '../css/play.css'
import api from '../api'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { clickPlay, s_to_hs } from "../uitl/uitl"
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
  const [visible, setVisible] = useState(false);
  const [lVol, setlVol] = useState(100);
  const [rVol, setrVol] = useState(100);
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
  const handleOk = () => { };
  const handleCancel = () => { };
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
      dispatch({ type: "setActiveKey", playload: "3" })
    }
  }, [state.isPlay])
  useEffect(() => {
    if (state.isPlay !== play) {
      dispatch({ type: "playAuto", playload: play })
      playFn(state, play);
      dispatch({ type: "setActiveKey", playload: "3" })
    }
  }, [play])
  useEffect(() => {
    if (state.currentMusic) {
      api.lyric({ songmid: state.currentMusic.songmid }, (res) => {
        const lyric = res.data.lyric;
        dispatch({ type: "setLyric", playload: lyric });
      });
      setDetails(state.currentMusic);
    }
  }, [state.currentMusic])
  useEffect(() => {
    if (state.notFount) {
      state.audio.pause();
      playNextMusic();
    }

  }, [state.notFount]);
  useEffect(() => {
    dispatch({ type: "setCurrentTime", playload: currentTime })
  }, [currentTime]);
  let filter;
  const lVolChange = (v) => {
    filter.frequency.value = v; //取值范围 小于800
    filter.Q.value = v; //小于1000
    setlVol(v);
    setrVol(v);
  }
  useEffect(() => {
    if (visible) {
      const ctx = new AudioContext;
      const media = ctx.createMediaElementSource(state.audio)
      filter = ctx.createBiquadFilter();


      media.connect(ctx.destination);
    }

  }, [visible])
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
            <span> {s_to_hs(currentTime)} / {s_to_hs(duration)}  </span>
            <span>{details.songname}</span>
          </div>
          <Slider tipFormatter={(speek) => {
            s_to_hs(speek)
          }} value={currentTime} max={duration} onChange={progressChange} />
        </div>
        <div className="volume ds-flex">
          <SoundOutlined className="volume-icon" />
          <Slider className="ds-f1" tipFormatter={(speek) => {
            return speek * 10;
          }} min={0} max={1} step={0.1} value={volume} onChange={volumeChange} />
        </div>
        <Button onClick={() => {
          setVisible(true);

        }}>音效</Button>
        <Modal
          visible={visible}
          title="音效设置"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              确定
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              取消
            </Button>,
          ]}
        >
          <p>
            <label>左声道：</label>
            <Slider className="ds-f1" tipFormatter={(speek) => {
              return speek * 10;
            }} min={0} max={1} step={0.1} value={lVol} onChange={lVolChange} />
          </p>
          <p>
            <label>右声道：</label>
            <Slider className="ds-f1" tipFormatter={(speek) => {
              return speek * 10;
            }} min={0} max={1} step={0.1} value={volume} onChange={volumeChange} />
          </p>
        </Modal>

      </Footer>
    </>
  )
}