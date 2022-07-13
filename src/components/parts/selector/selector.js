import React, { useState } from 'react'
import Modal from '../modal/modal'
import "./selector.css"

const Selector = (props) => {
    // const [modalOpacity, setModalOpacity] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    return (
        <div className = "selector_wrapper">
            <span className = "selector_title">{props.title}</span>
            <div className = "selector_body">
                <button className = "selector_btn" onClick = {()=>{
                    if(isShowModal){
                        // setModalOpacity(0);
                        setIsShowModal(false);
                    } else {
                        // setModalOpacity(1);
                        setIsShowModal(true);
                    }
                }}>
                {props.name}
                </button>
                <Modal visibility = {isShowModal ? "visible" : "hidden"} list = {props.list}/>
            </div>
        </div>
    )
}

export default Selector;
