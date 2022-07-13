import Loading from "../../images/loading.gif"
import BlueLoading from "../../images/loading-blue.gif"

import React from 'react'
import { connect } from 'react-redux'
import "./loader.css";

export const Loader = () => {
    return (
        <div>
            <img src = {Loading} alt = "loading" className = "loading_dark_gif"/>
        </div>
    )
}

export const BlueLoader = () => {
    return (
        <img src = {BlueLoading} alt = "loading" className = "loading_gif"/>
    )
}