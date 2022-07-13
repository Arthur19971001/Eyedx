import React from 'react';
import CheckBox from '../check_box/check_box';
import "./modal.css";

const Modal = (props) => {
    return (
        <div className = "modal_option" style = {{
            visibility: `${props.visibility}`,
            top: `${props.top}`,
            right: `${props.right}`,
            width: `${props.width}`,
            padding: `${props.padding}`
        }}>
           {props.list}
        </div>
    )
}

export default Modal;