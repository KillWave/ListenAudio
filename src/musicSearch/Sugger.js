import React, { useState, useContext, useMemo } from 'react'

import { StoreContext } from '../store'
import "../uitl/uitl"
export default (props) => {
    const { list, setValue, setDataFn, onRef } = props;
    const [isShow, isShowFn] = useState(true);
    const { dispatch } = useContext(StoreContext);
    useMemo(() => onRef(isShow, isShowFn), [isShow])

    return (
        <div className="seachResult"  >
            {
                isShow ? list.map((item, key) => {
                    return (<div className="suggersItem" key={key} onClick={
                        () => {
                            setValue.dispatch(item.songname);
                            setValue.search(item.songname, setDataFn)
                            isShowFn(false);
                            dispatch({ type: "setList", playload: list })
                            dispatch({ type: "setWord", playload: item.songname })
                        }
                    }>{item.songname}</div>)
                }) : []
            }
        </div>
    )

}