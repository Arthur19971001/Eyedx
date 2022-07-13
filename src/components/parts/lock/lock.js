import React from 'react'
import {ReactComponent as Locked} from "../../../images/lock.svg";
import {ReactComponent as Unlocked} from "../../../images/unlock.svg";

const Lock = (props) => {
    return (
        <div onClick = {props.onClick}>
        {props.isHold ? <Locked fill = "#0069BB"/> : <Unlocked fill = "#9f9f9f"/>}
        </div>
    );
}

export default Lock;