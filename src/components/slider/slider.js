import React from 'react';
import "./slider.css";
import { Icon } from '@iconify/react';
import zoomIn from '@iconify-icons/akar-icons/zoom-in';

const Slider = (props) => {
    return <div className = 'slider_div' style = {{opacity: `${props.opacity}`}}>
        <Icon icon={zoomIn} className='slider_icon'></Icon>
        <input type='range' className='slider_style'
        style = {{
            background: `linear-gradient(to right, white, white) 0% 0%/${props.progress+'%'} 100% no-repeat #AAA`,
            borderRadius: '5px'}}
        min ={props.min} max ={props.max} value = {props.value} onChange = {props.onChange}/>
    </div>
}

export default Slider;