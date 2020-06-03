import React, { useContext, useState, useEffect } from "react";
import api from "../api";
import { StoreContext } from "../store";
import { List, Card } from "antd";
import { clickPlay } from "../uitl/uitl";
//https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472%E4%BD%9C%E8%80%85%EF%BC%9A%E6%B4%9B%E9%92%A7%E5%AF%92%E9%93%BE%E6%8E%A5%EF%BC%9Ahttps://www.jianshu.com/p/3fc81d14dc4d%E6%9D%A5%E6%BA%90%EF%BC%9A%E7%AE%80%E4%B9%A6%E8%91%97%E4%BD%9C%E6%9D%83%E5%BD%92%E4%BD%9C%E8%80%85%E6%89%80%E6%9C%89%E3%80%82%E5%95%86%E4%B8%9A%E8%BD%AC%E8%BD%BD%E8%AF%B7%E8%81%94%E7%B3%BB%E4%BD%9C%E8%80%85%E8%8E%B7%E5%BE%97%E6%8E%88%E6%9D%83%EF%BC%8C%E9%9D%9E%E5%95%86%E4%B8%9A%E8%BD%AC%E8%BD%BD%E8%AF%B7%E6%B3%A8%E6%98%8E%E5%87%BA%E5%A4%84%E3%80%82
import "../css/recommend.css";
const { Meta } = Card;

export default function () {
  const { state, dispatch } = useContext(StoreContext);
  const [info, setInfo] = useState({});
  const [songlist, setSonglist] = useState([]);
  const { recommend } = api;
  const [flag, setFlag] = useState(false);
  recommend.then((res) => {
    setInfo(res.data.topinfo);
    setSonglist(res.data.songlist);
  });
  const foundHistory = (item) => {
    if (state.historyList.length > 1) {
      const music = state.historyList.find(
        (music) => item.albummid === music.albummid
      );
      if (music === undefined) {
        dispatch({ type: "setHistoryListPush", playload: [item] });
      }
    } else {
      dispatch({ type: "setHistoryListPush", playload: [item] });
    }
  };
  const foundIndex = (music) => {
    return songlist.findIndex((item) => {
      const data = item.data;
      return data.albummid === music.albummid;
    });
  };
  useEffect(() => {
    if (flag) {
      const dataList = songlist.map((d) => d.data);
      dispatch({
        type: "setMusicList",
        playload: dataList,
      });
    }
  }, [flag]);
  return (
    <>
      <div className="recommend">
        <div className="recommend-dscripten">
          <Card
            style={{ height: "calc(100%)" }}
            cover={<img alt="example" src={info.MacListPicUrl} />}
          >
            <Meta
              title={info.ListName}
              description={
                <div dangerouslySetInnerHTML={{ __html: info.info }}></div>
              }
            />
          </Card>
        </div>
        <div className="recommend-list">
          <List
            size="large"
            bordered
            header={<div>{info.ListName}</div>}
            dataSource={songlist}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  clickPlay(item.data, state, dispatch);
                  foundHistory(item.data);
                  foundIndex(item.data);
                  setFlag(true);
                }}
              >
                {item.data.songname}
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
}
