import React from 'react';
import "./label.css"

export const CustomLabel = (props) => {
    const size = props.size;

    return (
        <div className = {"custom_label_div_"+size}>
            {props.title}
        </div>
    )
}

export const CustomBoxLabel = (props) => {
    return (
        <div className = "custom_box_label_div"
            style = {{
                color: `${props.color}`,
                background: `${props.backgroundColor} 0% 0% no-repeat padding-box`}}>
            <span className = "custom_box_label_span">{props.title}</span>
        </div>
    )
}

export const CustomAILabel = (props) => {
    return (
        <div className = "custom_ai_div">
            <span className = "custom_box_label_span label_ai_color">AI</span>
        </div>
    )
}