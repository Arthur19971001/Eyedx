import React from 'react'
import "./check_box.css"

export const CheckBox = (props) => {
    return (
        <div className = 'check_div'>                
            <label className = 'check_label'>
                <input type = 'checkbox' checked= {props.checked} onChange={props.onChange} className = 'check_box'></input>
                    <span className = 'check_title' style = {{color:props.color}}> {props.title}</span>
            </label>
        </div>
    );
}

export const DarkCheckBox = (props) => {
    return (
        <div className = 'check_div'>                
            <label className = 'check_label_dark'>
                <input type = 'checkbox' checked= {props.checked} onChange={props.onChange} className = 'check_box_dark'></input>
                    <span className = 'check_title_dark'> {props.title}</span>
            </label>
        </div>
    );
}

// export default CheckBox;