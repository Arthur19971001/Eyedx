import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import "./image_zoom.css";
import {CustomNormalInputSlider} from '../parts/input_range/input_range'
import {useDimensions} from "../../common/sizeTgarget";
import { Icon } from '@iconify/react';
import zoomIn from '@iconify-icons/akar-icons/zoom-in';

const MousePosition = {
    position_x : 0,
    position_y : 0,
}

const OriginModel = {
    origin_x: 0,
    origin_y:0,
}

const DragModel = {
    start_x: 0,
    start_y: 0,
}

const DistanceModel = {
    distance_x: 0,
    distance_y: 0,
}

const currentImgPostionModel = {
    current_x: 0,
    current_y: 0,
}

const ImageSizedModel = {
    width: 0,
    height: 0,
}

const ImageZoom = (props) => {
    const targetRef = useRef();
    const size = useDimensions(targetRef); /// 처음 이미지 사이즈
    const [changeImg, setChangeImg] = useState(ImageSizedModel); /// 바뀌는 이미지 사이즈

    const [position, setPosition] = useState(MousePosition); /// 마우스 커서 위치
    const [origin, setOrigin] = useState(OriginModel); /// 이미지 줌인 아웃 할때에 기준값
    const [scale, setScale] = useState(1); /// 이미지 줌인 아웃 크기 

    const [isDrag, setIsDrag] = useState(false); /// 클릭하고 있는지 아는지 여부 판단
    const [dragStart, setDragStart] = useState(DragModel); ///처음 드레그 시작 위치
    const [distance, setDistance] = useState(DistanceModel); ///드레그 하기시작하면서 변화되는 값
    const [current, setCurrent] = useState(currentImgPostionModel); ///현제 이미지 위치

    const [sliderOpacity, setSliderOpacity] = useState(0); /// 슬라이더 투명도
    const [changedSize, setChangedSize] = useState(size);
    const [isImgLoad, setIsImgLoad] = useState(true);
    const [currentSrc, setCurrentSrc] = useState("");
    const [didMount, setDidMount] = useState(false);
    const src = props.src;
    const id = props.id;
    const img = new Image();

    useLayoutEffect(() => {
        setCurrentSrc("");
    },[id])

    useEffect(() => {
        setDidMount(false);
        img.src = src;
        img.ref = targetRef;
        if(!didMount){
            if(src === "none"){
                setCurrentSrc(src);
                setIsImgLoad(false);
            } else {
                img.onload = () => {
                    handleOnLoad(img.src,img.ref);
                };
            }
        }
        return () => setDidMount(true);
    },[id,src])

    const handleOnLoad = (src,ref) => {
        setCurrentSrc(src);
        setIsImgLoad(false);
        const target = ref;
        if(target.current !== undefined){
            const sizeModel = {
                width: target.current.offsetWidth,
                height:target.current.offsetHeight,
            }
            setChangedSize(sizeModel);
        }
    }

    const handleWheelZoom = e => {
        // e.preventDefault();
        setSliderOpacity(1.0); 
        ///마우스 휠 올릴때 => 줌인
        if(e.deltaY < 0) {
            if(changeImg.width*1.08 >= 4032){
                setScale(scale);
                setChangeImg({
                    width: 4032,
                    height: 3020,
                });
            } else {
                setScale(scale*1.08);
                setChangeImg({
                    width: scale === 1 ? changedSize.width : changeImg.width*1.08,
                    height: scale === 1 ? changedSize.height : changeImg.height*1.08,
                });
            }
        }
        ///마우스 휠 내릴때
        if(e.deltaY > 0){
            /// 1.0 배 이하로 작아지지 않도록 고정
            if(changeImg.width/1.08 < changedSize.width) {
                setScale(1);
                /// 최소 스케일로 돌아왔을때 제자리로 복구
                setDistance({
                    distance_x: 0,
                    distance_y: 0, 
                });
                setCurrent({
                    current_x:0,
                    current_y:0
                });
                setChangeImg({
                    width: 0,
                    height: 0,
                })
            } else {
                setScale(scale/1.08);
                setChangeImg({
                    width: changeImg.width/1.08,
                    height: changeImg.height/1.08,
                })
            }
        }
        setOrigin({
            origin_x: position.position_x,
            origin_y: position.position_y,
        });
        setTimeout(()=>{
            setSliderOpacity(0)
        },3000);
    }

    const handleMouseMove = e => {
        e.preventDefault();
        ///마우스 클릭한 상태가 아닐때
        if(e.clientX > (window.innerWidth - 350)/2) {
            setPosition({
                position_x:e.clientX - (window.innerWidth-350)/2,
                position_y:e.clientY - 60,
            });
        } else {
            setPosition({
                position_x:e.clientX,
                position_y:e.clientY - 60,
            });
        }
        ///마우스를 클릭하고 있는 상태일때 => 드레그 가능
        if(isDrag){
            if(e.clientX > (window.innerWidth - 350)/2) {
                setDistance({
                    distance_x:current.current_x + ((e.clientX - (window.innerWidth-350)/2)-dragStart.start_x),
                    distance_y:current.current_y + ((e.clientY - 60) - dragStart.start_y),
                });
            } else {
                setDistance({
                    distance_x:current.current_x + (e.clientX-dragStart.start_x),
                    distance_y:current.current_y + ((e.clientY-60) - dragStart.start_y),
                });
            }
        }
    }

    ///드레그 시작
    const handleDragStart = (e) => {
        e.preventDefault();
        if(scale === 1){
            setIsDrag(false); /// 처음 상태에선 드레그 불가능을 하기 위해 isDrag == false
        } else {
            setIsDrag(true);
            if(e.clientX > (window.innerWidth - 350)/2) {
                setDragStart({
                    start_x: e.clientX - (window.innerWidth-350)/2,
                    start_y: e.clientY - 60,
                });
            } else {
                setDragStart({
                    start_x: e.clientX,
                    start_y: e.clientY - 60,
                });
            }
        }
    };
    
    ///드레그를 완료했을때
    const handleDragEnd = (e) => {
        e.preventDefault();
        setIsDrag(false);
        setCurrent({
            current_x: distance.distance_x,
            current_y: distance.distance_y,
        });
    };

    ///드레그하다가 이미지를 벗어날을 경우 드레그 불가능상태로 바꾸기
    const handleMouseLeave = (e) => {
        e.preventDefault();
        setIsDrag(false);
    }

    ///더블클릭 후 원래상태로 돌아오기
    const hanldeDoubleClick = (e) => {
        setSliderOpacity(1.0);
        setScale(1.0);
        setDistance({
            distance_x: 0,
            distance_y: 0,
        });
        setCurrent({
            current_x: 0,
            current_y: 0,
        });
        setPosition({
            position_x: 0,
            position_y: 0,
        });
        setChangeImg({
            width: 0,
            height: 0,
        })
        setTimeout(()=>{
            setSliderOpacity(0)
        },3000);
    }

    const handleRightClick = (e) =>{
        if(e.type === 'contextmenu'){
            e.preventDefault();
        }
    }

    const darkSlider = (
        <div className = 'dark_slider_div' style = {{opacity: `${sliderOpacity}`}}>
            <Icon icon={zoomIn} className='dark_slider_icon'></Icon>
            <CustomNormalInputSlider
            min = {0}
            max = {4032-changedSize.width} 
            onChange={handleWheelZoom}
            value = {changeImg.width === 0 ? changeImg.width : changeImg.width-changedSize.width} 
            trackStyle = {[{backgroundColor: "white", height: 4}]}
            railStyle = {{backgroundColor: "#404040"}}
            handleStyle	= {[{border: "white solid 2px", backgroundColor:"black"}]}
        />
        </div>
    )

    const imgZoom = (
        <>
        {isImgLoad ? <span>loading</span> : currentSrc === "" ? <span>loading</span> : currentSrc === "none" ? <span>no data</span>: <div className = "image_zoom_div"> 
            <img className = 'img_src' 
            alt=''
            ref = {targetRef}
            onContextMenu = {(e)=>handleRightClick(e)}
            onWheel = {(e)=>handleWheelZoom(e)} 
            onMouseMove = {(e)=>handleMouseMove(e)}
            onMouseDown = {handleDragStart}
            onMouseUp = {(e)=>handleDragEnd(e)}
            onMouseLeave = {handleMouseLeave}
            onDoubleClick = {hanldeDoubleClick} 
            style = {{
                transform: `scale(${scale}) translate(${distance.distance_x+'px'}, ${distance.distance_y+'px'})`,
                transformOrigin: `${origin.origin_x+'px'} ${origin.origin_y+'px'}`}}
            src = {currentSrc}
            /></div>}
        </>
    )

    return(
        <div className = "image_zoom_wrap">
            {imgZoom}
            {darkSlider}
        </div>
    )
}

export default ImageZoom;