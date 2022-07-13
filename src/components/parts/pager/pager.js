import React,{useState,useEffect} from 'react'
import {ReactComponent as PagerJump} from "../../../images/paging_jump_active.svg"
import {ReactComponent as PagerNext} from "../../../images/paging_next_active.svg";
import "./pager.css"

const pagerModel = {
    dataCount:0,
    endPage: 1,
    nextBlock: 0,
    pageNumber: 0,
    nextPage: 0,
    prevBlock: 0,
    prevPage: 0,
    startPage: 1,
    totalPage: 0,
}

const Pager = (props) => {
    const [pagers, setPagers] = useState(pagerModel);
    const [clickedId, setClickedId] = useState(0);
    const [initButtons, setInitButtons] = useState([1]);

    const [currentPageNumber, setCurrentPageNumber] = useState(0);

    const updateButtons = props.buttons;
    const isFromFilter = props.fromFilter;

    const currentPage = props.currentPage;

    useEffect(() => {
        if(updateButtons !== undefined && Object.keys(updateButtons).length !== 0) {
            const pagerList = [];
            const listLength = updateButtons.endPage - updateButtons.startPage + 1;
            for(let i = 0; i<listLength; i++){
                pagerList.push(updateButtons.startPage+i);
            }
            setPagers(updateButtons);
            setInitButtons(pagerList);
        } else {
            const pagerList = [];
            const listLength = pagers.endPage - pagers.startPage + 1;
            for(let i = 0; i<listLength; i++){
                pagerList.push(pagers.startPage+i);
            }
            setInitButtons(pagerList);
        }
        setClickedId(currentPage%5-1);
        // if(isFromFilter){
        //     setClickedId(currentPage%5-1);
        // }
    },[updateButtons])

    const handleClick = (e,i) => {
        if(initButtons.length !== 1) {
            setCurrentPageNumber(i);
            setClickedId(i); 
            props.buttonsEvent(e,i);
        }
    }

    const hanldeJumpFirstClick = (e) => {
        if(initButtons.length !== 1){
            props.onClickPreBlock(e);
            setClickedId(0);
        }
    }

    const handleJumpLastClick = (e) => {
        if(initButtons.length !== 1){
            props.onClickNextBlock(e);
            if(pagers.nextBlock === -1) {
                setCurrentPageNumber(pagers.endPage-pagers.startPage);
                setClickedId(pagers.endPage-pagers.startPage);
            } else {
                setClickedId(0);
            } 
        }
    }

    const handleNextClick = (e) => {
        if(initButtons.length !== 1){
            props.onClickNextPage(e);
            if(currentPageNumber+1 === initButtons.length){
                if(pagers.nextBlock === -1) {
                    setCurrentPageNumber(initButtons.length-1);
                    setClickedId(initButtons.length-1);
                } else {
                    setCurrentPageNumber(0);
                    handleJumpLastClick(e);
                }
            } else {
                setCurrentPageNumber(currentPageNumber+1);
                setClickedId(currentPageNumber+1);
            }
        }
    }

    const handleBackClick = (e) => {
        if(initButtons.length !== 1) {
            props.onClickPrePage(e);
            if(currentPageNumber-1 === -1){
                if(pagers.prevBlock === -1) {
                    setCurrentPageNumber(0);
                    setClickedId(0);
                }
                else {
                    setCurrentPageNumber(4);
                    setClickedId(4);
                }
            } else {
                setCurrentPageNumber(currentPageNumber-1);
                setClickedId(currentPageNumber-1);
            }
        }
    }

    const GrounpButton = (
        <div className = 'pager_number_div'>
        {initButtons.map((label,i) => (
            <div 
                key = {i} 
                className = {i === clickedId ? "pager_number_button_div active" : "pager_number_button_div"}
                onClick={(e)=> handleClick(e,i)}>
                <span className = 'pager_label'> {label} </span>
            </div>
            ))}
        </div>
    )

    return (
        <div className = 'pager_div'>
            <div className = 'pager_button_div' onClick = {(e) => hanldeJumpFirstClick(e)}>
                <PagerJump className = 'pager_jump'/>
            </div>
            <div className = 'pager_button_div' onClick = {(e) => handleBackClick(e)}>
                <PagerNext className = 'pager_next'/>
            </div>
            {GrounpButton}
            <div className = 'pager_button_div' onClick = {(e) => handleNextClick(e)}>
                <PagerNext className = 'pager_next' transform = {`rotate(180)`}/>
            </div> 
            <div className = 'pager_button_div' onClick = {(e) => handleJumpLastClick(e)}>
                <PagerJump className = 'pager_jump' transform = {`rotate(180)`}/>
            </div>    
        </div>
    )
}

export default Pager;
