import React from 'react'
import "./button.css";

export const NormalButton = (props) => {
    return (
        <button className = 'normal_button' style = {{
            width : `${props.width}`
        }} onClick = {props.onClick} disabled = {props.disabled}>
            {props.title}
        </button>
    )
}

export const NormalDarkButton = (props) => {
    const normalDarkInActive = (
        <button className = 'normal_dark_button' autoFocus style = {{
            width : `${props.width}`,
            //backgroundColor : props.isClick ? '#404040' : 'black',
        }} onClick = {props.onClick} disabled = {props.disabled}>
            {props.title}
        </button>
    )

    const normalDarkActive = (
        <button className = 'normal_dark_act_button' autoFocus style = {{
            width : `${props.width}`,
            //backgroundColor : props.isClick ? '#404040' : 'black',
        }} onClick = {props.onClick} disabled = {props.disabled}>
            {props.title}
        </button>
    )

    return (
        <>
            {props.isActive ? normalDarkActive : normalDarkInActive}
        </>
    )
}

export const NormalDarkActiveButton = (props) => {
    return (
        <button className = 'normal_dark_act_button' autoFocus style = {{
            width : `${props.width}`,
            //backgroundColor : props.isClick ? '#404040' : 'black',
        }} onClick = {props.onClick} disabled = {props.disabled}>
            {props.title}
        </button>
    )
}

export const CustomDarkButton = (props) => {
    return (
        <button className = 'custom_dark_button' style = {{
            width : `${props.width}`,
        }} onClick = {props.onClick} disabled = {props.disabled}>
            {props.title}
        </button>
    )
}

export const ToggleButton = (props) => {

    const toggleRight = (
        <div className = "toggle_button" onClick = {props.onClick}>
            <div className = "toggle_fill_color"><span className= "toggle_span">OD</span></div>
            <div className = "toggle_no_fill_color"><span className= "toggle_span">OS</span></div>
        </div>
    )

    const toggleLeft = (
        <div className = "toggle_button" onClick = {props.onClick}>
            <div className = "toggle_no_fill_color"><span className= "toggle_span">OD</span></div>
            <div className = "toggle_fill_color"><span className= "toggle_span">OS</span></div>
        </div>
    )

    return ( 
        <>
            {props.isRight ? toggleRight : toggleLeft}
        </>
    )
}