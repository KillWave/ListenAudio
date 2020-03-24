import React, {} from "react"

import { CaretRightOutlined,PauseOutlined } from '@ant-design/icons';
export default function Conctrl(props) {
    if (props.bool) {
        return <PauseOutlined className = "iconFont" />

    } else {
        return <CaretRightOutlined className = "iconFont" />
    }
}

