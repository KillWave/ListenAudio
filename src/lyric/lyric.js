import React, { useState, useContext, useEffect,useRef } from 'react'
import { StoreContext } from '../store'

function lrc(data, istotalTime) {
    var lyricArr = []
    // 在这里对data进行歌词处理
    // 转换其中的ascll
    var newdata = data.replace(/&#(\d+);/g, function (data) {
        return String.fromCharCode(data.substr(2, 2))
    })
    var dataArr = newdata.split('\n')
    for (var i = 0; i < dataArr.length; i++) {
        //以']'去分隔时间和歌词
        var timetext = dataArr[i].split(']')
        //需将时间的前半中括号去除,并将时间转换
        var time = timetext[0].replace(/[\[]/g, '').split(':')
        if (istotalTime) {
            var changetime = time[0] * 60 + parseInt(time[1])
        } else {
            var changetime = time[0] + ':' + parseInt(time[1])
        }
        //进行判断是否有歌词，没有的就跳过
        if (!timetext[1]) {
            continue;
        }
        var text = timetext[1]
        var obj = {
            time: changetime,
            text: text
        }
        lyricArr.push(obj)
    }
    return lyricArr
}

export default () => {
    const { state, dispatch } = useContext(StoreContext);
    const [lyric, setLyric] = useState([]);
    const couterRef = useRef();
    useEffect(() => {
        const sLyric = state.lyric;
        if (sLyric.length) {
            const time = lrc(sLyric, true);
            console.log(time)
            setLyric(time)
        }

    }, [state.lyric])
    useEffect(() => {
        const time = state.currentTime;
        const index = lyric.findIndex(item => {
            return item.time === time;
        });
        if(index != -1){
            const list =  couterRef.current.querySelectorAll("div");
            for(let i = 0; i < list.length; i++){
                list[i].style.background = 'unset';
            }
            list[index].scrollIntoView({block:"center",behavior: "smooth"});
            list[index].style.background = '#fff';
           
             console.log(index,list[index])
        }
        
    }, [state.currentTime]);
    return (
        <div style={{ height: "calc(100vh - 86px - 64px - 57px)", overflow: "hidden",textAlign: "center" }}>
            <div className="box-lyric" ref={couterRef} style={{margin:"calc((100vh - 86px - 64px - 57px) / 2)"}}>
                {
                    
                    lyric.map(item => {
                        return <div key={item.time}>{item.text}</div>
                    })
                }
            </div>


        </div>
    )
}