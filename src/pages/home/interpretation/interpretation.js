import React, { useState,useEffect, useLayoutEffect } from 'react';
import "./interpretation.css";
import ImageZoom from '../../../components/image_zoom/image_zoom'
import * as actions from '../../../actions/interpretation/interpretation_data';
import { connect } from 'react-redux'
import { DarkCheckBox,CheckBox } from '../../../components/parts/check_box/check_box';
import { NormalDarkButton,CustomDarkButton,ToggleButton} from '../../../components/parts/button/button';
import { InitDataModel} from "./initModel";
import {Loader} from "../../../components/loader/loader";
import { baseUrl } from '../../../actions/api';
import Lock from "../../../components/parts/lock/lock";
import { useHistory, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import {CustomDotInputSlider,CustomInputSlider} from '../../../components/parts/input_range/input_range';
import {CustomAILabel} from "../../../components/parts/label/label";


const isClickTypeModel = {
    isPhotoClicked : true,
    isReportClicked : false,
}

const isProgramModel = {
    isEye : true,
    isDiabetic : false,
}

const statusModel = {
    msg: "Send & Report",
    isHold: false,
}

const imgQualitySendModel = {
    score: 0,
    isCheck: false,
}

const marks = {
    '1' : <div className = {'normal15SecGray'}>Worst</div>,
    '2' : <div className = {'normal15SecGray'}>Bad</div>,
    '3' : <div className = {'normal15SecGray'}>Good</div>,
    '4' : <div className = {'normal15SecGray'}>Great</div>,
    '5' : <div className = {'normal15SecGray'}>Perfect</div>
}

const Interpretation=(props)=>{
    const [isSelected, setIsSelected] = useState(true);
    const [isAiSupport, setIsAiSupport] = useState(true);
    const [isTypeClick, setIsTypClick] = useState(isClickTypeModel);
    const [isProgram, setIsProgram] = useState(isProgramModel);
    const [initData, setInitData] = useState(InitDataModel);
    const [comment, setCommnet] = useState("");
    const stirngToObj = JSON.parse(localStorage.getItem("filter-value"));
    const year = localStorage.getItem("filter-value") !== null ? stirngToObj.lang === "kr" ? "년" : "year" : localStorage.getItem("lang") === "kr" ? "년" : "year";
    const  [status, setStatus] = useState(statusModel);
    const [sendImgData, setSendImgData] = useState(imgQualitySendModel);

    const [eyeOD, setEyeOD] = useState(InitDataModel.items[0].parts.od);
    const [eyeOS, setEyeOS] = useState(InitDataModel.items[0].parts.os); 
    const [diabeticOD, setDiabeticOD] = useState(InitDataModel.items[1].parts.od); 
    const [diabeticOS, setDiabeticOS] = useState(InitDataModel.items[1].parts.os);

    const [showImgQuality, setShowImgQuality] = useState(false);

    const [cookies] = useCookies(['token']);

    const history = useHistory();
    const userId = useParams();

    const queryObj = JSON.parse(localStorage.getItem("filter-value"));
    
    const errorStatus = () => { /// 데이터가 없는데 interpretation page 로 접속할 경우 생기는 에러메세지 산출
        if(localStorage.getItem("lang") === "kr") {
            localStorage.setItem("error_data","환자의 데이터가 존재하지 않습니다.");
            localStorage.setItem("error_value","true");
        } else {
            localStorage.setItem("error_data","Patient data does not exist.");
            localStorage.setItem("error_value","true");
        }
        history.goBack();
    }

    useLayoutEffect(()=>{
        setInitData(InitDataModel);
        try {
            if(userId.userId === ":userId") { /// 주소창에 /interpretation 이라고 치고 들어올경우
                errorStatus(); 
            } else { /// waiting page 에서 interpretation button 을 눌고 들어올경우
                if(localStorage.getItem("first_code") === ""){  /// waiting list 에 데이터가 없음
                    errorStatus();
                } else { /// 성공적으로 데이터 불러오기
                    props.getInterpretationData(userId.userId,queryObj,cookies.token.access_token);
                }
            }
        } catch (error) {
            errorStatus();
        }
    },[userId.userId])
 
    useEffect(() => {
        try{
           if(props.interpretationData !== undefined && Object.keys(props.interpretationData).length !== 0){
                setInitData(props.interpretationData);
                if(props.interpretationData.status === "Hold"){
                    setStatus({
                        ...status,
                        msg: "Hold",
                        isHold : true,
                    })
                } else {
                    setStatus({
                        ...status,
                        msg: "Send & Report",
                        isHold : false,
                    })
                }

                if(props.interpretationData.items.length === 1) {
                    if(props.interpretationData.items[0].code !== "edp"){
                        setIsProgram({
                            "isEye" : false,
                            "isDiabetic" : true,
                        })
                        setEyeOD(props.interpretationData.items[0].parts.od)
                        setEyeOS(props.interpretationData.items[0].parts.os)
                    } else {
                        setIsProgram({
                            "isEye" : true,
                            "isDiabetic" : false,
                        })
                        setDiabeticOD(props.interpretationData.items[0].parts.od)
                        setDiabeticOS(props.interpretationData.items[0].parts.os)
                    }   
                } else {
                    setIsProgram({
                        "isEye" : true,
                        "isDiabetic" : false,
                    })
                    setEyeOD(props.interpretationData.items[0].parts.od)
                    setEyeOS(props.interpretationData.items[0].parts.os)
                    setDiabeticOD(props.interpretationData.items[1].parts.od)
                    setDiabeticOS(props.interpretationData.items[1].parts.os)
                }

                if(props.interpretationData.shot.od === ""){
                    setIsSelected(false);
                } else if(props.interpretationData.shot.os === ""){
                    setIsSelected(true);
                } else {
                    setIsSelected(true);
                }
                setIsAiSupport(props.interpretationData.aiSupport);
                setCommnet(props.interpretationData.comment);
            }     
       } catch (e) {
            errorStatus();
       }
        
    },[props.interpretationData._id])

    const handleHoldImg = () => {
        status.isHold ? setStatus(statusModel) : setStatus({
            ...status,
            msg: "Hold",
            isHold: true,
        })
    }

    const handleComment = (e) => {
        setCommnet(e.target.value);
    }

    const handleImgChange = (value) => {
        if(initData.items.length === 2 && isProgram.isDiabetic){
            setIsProgram({
                ...isProgram,
                "isEye":true,
                "isDiabetic":false,
            })
        } else {
            if(initData.items.length === 1) {
                if(initData.items[0].code === "edp") {
                    setIsProgram({
                        ...isProgram,
                        "isEye":true,
                        "isDiabetic":false,
                    })
                } else {
                    setIsProgram({
                        ...isProgram,
                        "isEye":false,
                        "isDiabetic":true,
                    })
                }
            }
        }

        switch (value) {
            case "od":
                if(initData.shot.od !== "" && initData.shot.os !== ""){
                    setIsSelected(true);
                }  
                break;
            case "os":
                if(initData.shot.od !== "" && initData.shot.os !== ""){
                    setIsSelected(false);
                }
                break;
            default:
                break;
        }

        setIsAiSupport(true);
    }

    const handleTypeButtonChange = (value) => {
        switch (value) {
            case "photo":
                setIsTypClick({
                    ...isTypeClick,
                    "isPhotoClicked" : true,
                    "isReportClicked" : false,
                });
                break;
            case "report":
                setIsTypClick({
                    ...isTypeClick,
                    "isPhotoClicked" : false,
                    "isReportClicked" : true,
                });
                break;
            default:
                break;
        }
    }
 
    const handleToggleButton = () => {
        if(initData.items.length === 2 && isProgram.isDiabetic){
            setIsProgram({
                ...isProgram,
                "isEye":true,
                "isDiabetic":false,
            })
        } else {
            if(initData.items.length === 1) {
                if(initData.items[0].code === "edp") {
                    setIsProgram({
                        ...isProgram,
                        "isEye":true,
                        "isDiabetic":false,
                    })
                } else {
                    setIsProgram({
                        ...isProgram,
                        "isEye":false,
                        "isDiabetic":true,
                    })
                }
            }
        }
        
        if(initData.shot.od !== "" && initData.shot.os !== ""){
            if(isSelected){
                setIsSelected(false);
            } else {
                setIsSelected(true);
            }
        }

        setIsAiSupport(true);
    }

    const handleProgramButton = (value) => {

        switch (value) {
            case "edp":
                setIsProgram({
                    ...isProgram,
                    "isEye" : true,
                    "isDiabetic" : false,
                })
                break;
            case "dr":
                setIsProgram({
                    ...isProgram,
                    "isEye" : false,
                    "isDiabetic" : true,
                })
                break;
            default:
                break;
        }
    }
 
    const handleChangeChecked = (i,j,code) => {
        //console.log(eyeODTem[i].ai[j]);
        let tempList;
        if(isAiSupport) {
            if(isProgram.isEye) {
                if(isSelected) {
                    tempList = eyeOD[i].ai;
                    switch (code) {
                        case "retinal_abnormality":
                            if(eyeOD[i].ai[j]) {
                                tempList.splice(j,1,false);
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                );
                            } else {
                                if(j === 7) {
                                    tempList.splice(0,7,false,false,false,false,false,false,false);
                                    tempList.splice(7,1,true);
                                    setEyeOD(
                                        eyeOD.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                } else {
                                    tempList.splice(7,1,false);
                                    tempList.splice(j,1,true);
                                    setEyeOD(
                                        eyeOD.map((value) => value.code === code ? {
                                            ...value,
                                            "ai" : tempList
                                        } : {...value})
                                    )
                                }
                            }        
                            break;
                        case "media_abnormality":
                            if(eyeOD[i].ai[j]) {
                                tempList.splice(j,1,false);
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                if(j === 1) {
                                    tempList.splice(0,2,false,true)
                                    setEyeOD(
                                        eyeOD.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                } else {
                                    tempList.splice(0,2,true,false)
                                    setEyeOD(
                                        eyeOD.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                }
                            }
                            break;
                        case "optic_nerve_abnormality":
                            if(eyeOD[i].ai[j]) {
                                tempList.splice(j,1,false);
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                if(j === 1) {
                                    tempList.splice(0,2,false,true)
                                    setEyeOD(
                                        eyeOD.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                } else {
                                    tempList.splice(0,2,true,false)
                                    setEyeOD(
                                        eyeOD.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                }
                            }
                        break;
                        default:
                            break;
                    }
                } else {
                    tempList=eyeOS[i].ai;
                    switch (code) {
                        case "retinal_abnormality":
                            if(eyeOS[i].ai[j]) {
                                tempList.splice(j,1,false);
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                if(j === 7) {
                                    tempList.splice(0,7,false,false,false,false,false,false,false);
                                    tempList.splice(7,1,true);
                                    setEyeOS(
                                        eyeOS.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                } else {
                                    tempList.splice(7,1,false);
                                    tempList.splice(j,1,true);
                                    setEyeOS(
                                        eyeOS.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                }
                            }   
                            break;
                        case "media_abnormality":
                            if(eyeOS[i].ai[j]) {
                                tempList.splice(j,1,false);
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                if(j === 1) {
                                    tempList.splice(0,2,false,true);
                                    setEyeOS(
                                        eyeOS.map((value) => value.code === code ? {
                                            ...value,
                                            ai : eyeOS[i].ai.splice(0,2,false,true)
                                        } : {...value})
                                    )
                                } else {
                                    tempList.splice(0,2,true,false);
                                    setEyeOS(
                                        eyeOS.map((value) => value.code === code ? {
                                            ...value,
                                            ai : eyeOS[i].ai.splice(0,2,true,false)
                                        } : {...value})
                                    )
                                }
                            }
                            break;
                        case "optic_nerve_abnormality":
                            if(eyeOS[i].ai[j]) {
                                tempList.splice(j,1,false);
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                if(j === 1) {
                                    tempList.splice(0,2,false,true)
                                    setEyeOS(
                                        eyeOS.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                } else {
                                    tempList.splice(0,2,true,false)
                                    setEyeOS(
                                        eyeOS.map((value) => value.code === code ? {
                                            ...value,
                                            ai : tempList
                                        } : {...value})
                                    )
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            } else if(isProgram.isDiabetic){
                if(isSelected) {
                    tempList=diabeticOD[i].ai
                    switch (code) {
                        case "diabetic_retinopathy":
                            if(diabeticOD[i].ai[j]) {
                                tempList.splice(j,1,false)
                                setDiabeticOD(
                                    diabeticOD.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(0,5,false,false,false,false,false)
                                //tempList = [false,false,false,false,false]
                                tempList.splice(j,1,true)
                                setDiabeticOD(
                                    diabeticOD.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            }  
                            break;
                        case "csme_suspicion":
                            if(diabeticOD[i].ai[j]) {
                                tempList.splice(j,1,false)
                                setDiabeticOD(
                                    diabeticOD.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(j,1,true)
                                setDiabeticOD(
                                    diabeticOD.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            }    
                            break;
                        default:
                            break;
                    }
                } else {
                    tempList=diabeticOS[i].ai
                    switch (code) {
                        case "diabetic_retinopathy":
                            if(diabeticOS[i].ai[j]) {
                                tempList.splice(j,1,false)
                                setDiabeticOS(
                                    diabeticOS.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(0,5,false,false,false,false,false)
                                tempList.splice(j,1,true)
                                setDiabeticOS(
                                    diabeticOS.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            }    
                            break;
                        case "csme_suspicion":
                            if(diabeticOS[i].ai[j]) {
                                tempList.splice(j,1,false)
                                setDiabeticOS(
                                    diabeticOS.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(j,1,true)
                                setDiabeticOS(
                                    diabeticOS.map((value) => value.code === code ? {
                                        ...value,
                                        ai : tempList
                                    } : {...value})
                                )
                            }    
                            break;
                        default:
                            break;
                    }
                }
            }
        } else {
            if(isProgram.isEye) {
                if(isSelected) {
                    tempList = eyeOD[i].checked;
                    switch (code) {
                        case "retinal_abnormality":
                            if(eyeOD[i].checked[j]) {
                            tempList.splice(j,1,false);
                            setEyeOD(
                                eyeOD.map((value) => value.code === code ? {
                                    ...value,
                                    "checked" : tempList
                                } : {...value})
                            )
                        } else {
                            if(j === 7) {
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        "checked" :[false,false,false,false,false,false,false,true]
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(7,1,false);
                                tempList.splice(j,1,true);
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        "checked" : tempList
                                    } : {...value})
                                )
                            }
                        }        
                        break;
                    case "media_abnormality":
                        if(eyeOD[i].checked[j]) {
                            tempList.splice(j,1,false);
                            setEyeOD(
                                eyeOD.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            if(j === 1) {
                                tempList.splice(0,2,false,true)
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        checked : tempList
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(0,2,true,false)
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        checked : tempList
                                    } : {...value})
                                )
                            }
                        }
                        break;
                    case "optic_nerve_abnormality":
                        if(eyeOD[i].checked[j]) {
                            tempList.splice(j,1,false);
                            setEyeOD(
                                eyeOD.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            if(j === 1) {
                                tempList.splice(0,2,false,true)
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        checked : tempList
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(0,2,true,false)
                                setEyeOD(
                                    eyeOD.map((value) => value.code === code ? {
                                        ...value,
                                        checked : tempList
                                    } : {...value})
                                )
                            }
                        }
                    break;
                    default:
                        break;
                }
            } else {
                tempList=eyeOS[i].checked
                switch (code) {
                    case "retinal_abnormality":
                        if(eyeOS[i].checked[j]) {
                            tempList.splice(j,1,false);
                            setEyeOS(
                                eyeOS.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            if(j === 7) {
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        checked : [false,false,false,false,false,false,false,true]
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(7,1,false);
                                tempList.splice(j,1,true);
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        checked : tempList
                                    } : {...value})
                                )
                            }
                        }   
                        break;
                    case "media_abnormality":
                        if(eyeOS[i].checked[j]) {
                            tempList.splice(j,1,false);
                            setEyeOS(
                                eyeOS.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            if(j === 1) {
                                tempList.splice(0,2,false,true);
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        checked : eyeOS[i].checked.splice(0,2,false,true)
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(0,2,true,false);
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        checked : eyeOS[i].checked.splice(0,2,true,false)
                                    } : {...value})
                                )
                            }
                        }
                        break;
                    case "optic_nerve_abnormality":
                        if(eyeOS[i].checked[j]) {
                            tempList.splice(j,1,false);
                            setEyeOS(
                                eyeOS.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            if(j === 1) {
                                tempList.splice(0,2,false,true)
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        checked : tempList
                                    } : {...value})
                                )
                            } else {
                                tempList.splice(0,2,true,false)
                                setEyeOS(
                                    eyeOS.map((value) => value.code === code ? {
                                        ...value,
                                        checked : tempList
                                    } : {...value})
                                )
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            } else if(isProgram.isDiabetic){
                if(isSelected) {
                    tempList=diabeticOD[i].checked
                    switch (code) {
                    case "diabetic_retinopathy":
                        if(diabeticOD[i].checked[j]) {
                            tempList.splice(j,1,false)
                            setDiabeticOD(
                                diabeticOD.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            tempList.splice(0,5,false,false,false,false,false)
                            //tempList = [false,false,false,false,false]
                            tempList.splice(j,1,true)
                            setDiabeticOD(
                                diabeticOD.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        }  
                        break;
                    case "csme_suspicion":
                        if(diabeticOD[i].checked[j]) {
                            tempList.splice(j,1,false)
                            setDiabeticOD(
                                diabeticOD.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            tempList.splice(j,1,true)
                            setDiabeticOD(
                                diabeticOD.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        }    
                        break;
                    default:
                        break;
                }
            } else {
                tempList=diabeticOS[i].checked
                switch (code) {
                    case "diabetic_retinopathy":
                        if(diabeticOS[i].checked[j]) {
                            tempList.splice(j,1,false)
                            setDiabeticOS(
                                diabeticOS.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            tempList.splice(0,5,false,false,false,false,false)
                            tempList.splice(j,1,true)
                            setDiabeticOS(
                                diabeticOS.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        }    
                        break;
                    case "csme_suspicion":
                        if(diabeticOS[i].checked[j]) {
                            tempList.splice(j,1,false)
                            setDiabeticOS(
                                diabeticOS.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        } else {
                            tempList.splice(j,1,true)
                            setDiabeticOS(
                                diabeticOS.map((value) => value.code === code ? {
                                    ...value,
                                    checked : tempList
                                } : {...value})
                            )
                        }    
                        break;
                    default:
                        break;
                }
            }
            }
        }
       
    }

    const handleAISupportChecked = () => {
        if(isAiSupport) {
            setIsAiSupport(false);
        } else {
            setIsAiSupport(true);
        }
    }

    const handleImgQualityChange = (value) => {
        setSendImgData({
            ...sendImgData,
            "score" : value,
        })
    }

    const handleImgQualityChecked = ()=>{
        if(sendImgData.isCheck){
            setSendImgData({
                ...sendImgData,
                "isCheck" : false
            })
        } else {
            setSendImgData({
                ...sendImgData,
                "isCheck" : true
            })
        }
    }

    const sendDataType = () => {
        const edp = {
            code: "edp",
            name: "Eye Disease Presence",
            parts : {
                od: eyeOD,
                os: eyeOS
            },
        }

        const dr = {
            code: "dr",
            name: "Diabetic Retinopathy",
            parts : {
                od: diabeticOD,
                os: diabeticOS
            },
        }
        const body = {
            lang: localStorage.getItem("lang"),
            status : status.isHold ? 50 : 100,
            comment : comment,
            programs : [edp,dr],
            aiSupport : isAiSupport,
            id : localStorage.getItem("userID"),
        }        
        setCommnet("");
        setSendImgData({
            ...sendImgData,
            "score":0,
            "isCheck":false,
        })
        setShowImgQuality(false); 
        props.sendInterpretationData(localStorage.getItem("first_code"),body,cookies.token.access_token,onSuccessful);
    }

    const onSuccessful = (userID) => {
        localStorage.setItem("first_code",userID);
        let url = "/interpretation/" + localStorage.getItem("first_code");
        history.replace(url);
    }

    const handleSendData = () => {
        if(initData.isVote){
            sendDataType();
        } else {
            setShowImgQuality(true);
        }
        
    }

    const handleRetake = () => {
        const body = {
            lang: localStorage.getItem("lang"),
            status : 200
        }
        props.sendInterpretationData(localStorage.getItem("first_code"),body,cookies.token.access_token,onSuccessful); 
        setCommnet("");
        setShowImgQuality(false);
    }

    const handleImageScoreSend = () => {
        const params = {start: sendImgData.score,ns:sendImgData.isCheck === true ? 1 : 0,}
        props.sendImageQulityData(localStorage.getItem("first_code"),params,cookies.token.access_token,nextRequest);
    }
    
    const nextRequest = (result) => {
        if(result === "ok"){
            sendDataType();
        } else {
            setShowImgQuality(true);
        }
    }

    const programData = (
        <div className = "check_list_div">
            {isProgram.isEye ?
                isSelected ?
                    eyeOD.map((program,i) => (   
                        <div>                             
                            <div key = {i} className = "patient_info_content_span">{program.name}</div>
                                {program.vals.map((val,j) => (
                            <div key={j} className = "check_box_div">
                                <DarkCheckBox title = {val.name} checked = {isAiSupport ? program.ai[j] : program.checked[j]} onChange = {()=>handleChangeChecked(i,j,program.code)}/>
                                {isAiSupport ? program.ai_temp[j] ? <CustomAILabel/> : <div></div> : <div></div>}
                            </div>))}  
                        </div>)) : 
                    eyeOS.map((program,i) => (   
                        <div>                             
                            <div key = {i} className = "patient_info_content_span">{program.name}</div>
                                {program.vals.map((val,j) => (
                            <div key={j} className = "check_box_div">
                                <DarkCheckBox title = {val.name} checked = {isAiSupport ? program.ai[j] : program.checked[j]} onChange = {()=>handleChangeChecked(i,j,program.code)}/>
                                {isAiSupport ? program.ai_temp[j] ? <CustomAILabel/> : <div></div> : <div></div>}
                            </div>))}  
                        </div>
                        )) :
                isSelected ?         
                    diabeticOD.map((program,i) => (   
                        <div>                             
                            <div key = {i} className = "patient_info_content_span">{program.name}</div>
                                {program.vals.map((val,j) => (
                            <div key={j} className = "check_box_div">
                                <DarkCheckBox title = {val.name} checked = {isAiSupport ? program.ai[j] : program.checked[j]} onChange = {()=>handleChangeChecked(i,j,program.code)}/>
                                {isAiSupport ? program.ai_temp[j] ? <CustomAILabel/> : <div></div> : <div></div>}
                            </div>))}  
                        </div>)) :  
                    diabeticOS.map((program,i) => (   
                        <div>                             
                            <div key = {i} className = "patient_info_content_span">{program.name}</div>
                                {program.vals.map((val,j) => (
                            <div key ={j} className = "check_box_div">
                                <DarkCheckBox title = {val.name} checked = {isAiSupport ? program.ai[j] : program.checked[j]} onChange = {()=>handleChangeChecked(i,j,program.code)}/>
                                {isAiSupport ? program.ai_temp[j] ? <CustomAILabel/> : <div></div> : <div></div>}
                            </div>))}  
                        </div>))       
            }
        </div>
    )

    const programList = (
        <div className = "inspect_list_div">
            <ToggleButton isRight = {isSelected} onClick = {handleToggleButton}/>
            <div className = "patient_info_title_span">Program</div>    
            {initData.items.map((item,i) => 
                <NormalDarkButton key={i} width = "100%" isActive = {item.code === "edp" ? isProgram.isEye : isProgram.isDiabetic} title = {item.name} onClick = {()=>handleProgramButton(item.code)}/>
            )}
            {programData}
            <div style = {{display:"flex", justifyContent:"end"}}>
                <CheckBox title = {"Ai support"} color = "white" checked = {isAiSupport} onChange = {()=>handleAISupportChecked()}/>
            </div>
        </div>
    )

    const interpretationList = (
        <div className = "interpretation_list_div">
            <div>
                <div className = "inspect_header_div">
                    <div className = "inspect_date_div">
                        <Lock onClick = {handleHoldImg} isHold = {status.isHold}/>
                        <span className = "inspect_date_span">{initData.interpretationDate}</span>
                    </div>
                    <span className = "inspect_date_span">{"Remaing list: " + initData.remainCount}</span>
                </div>
                <div className = "patient_info_div">
                    <div className = "patient_info_title_span">Patient Information</div>
                    <div className = "type_button_div">
                        <NormalDarkButton isActive = {isTypeClick.isPhotoClicked} title = "Photo" width = "318px" onClick = {()=>handleTypeButtonChange("photo")}/>
                        {/* <NormalDarkButton isActive = {isTypeClick.isReportClicked} title = "Photo" width = "150px" onClick = {()=>handleTypeButtonChange("report")}/> */}
                    </div>
                    <div className = "patient_info_content_span">B/D : {initData.birthday}</div>
                    <div className = "patient_info_content_span">Basal disease : {initData.basalDisease === null ? "none" : 
                        initData.basalDisease.map((title,k)=>(
                            <span key={k}>{title+year}{initData.basalDisease.length-1 === k ? "" : " / "}</span>
                        ))}</div>
                    <div className = "patient_info_content_span">Race : {initData.race}</div>
                </div>
            </div>
            {programList}
            <div className = "bottom_submit_div">
                <div className = "comments_div">
                    <div className = "patient_info_title_span">Comments</div>
                    <textarea className = "comment_textarea" placeholder="...entering" rows="4" value = {comment} onChange = {(e)=>handleComment(e)}></textarea>
                </div>
            </div>
            <div className = "sumbit_button_div">
                <div className = "type_button_div"> 
                    <NormalDarkButton isActive = {false} title = "Retake" width = "150px" onClick = {handleRetake}/>
                    <CustomDarkButton title = {status.msg} width = "150px" onClick = {handleSendData}/>
                </div>
            </div>    
        </div>
    )
    
    const image_quality = (
        <div className = {'interpretation_image_quality_QHD'} 
        style = {{visibility:`${showImgQuality ? "visible" : "hidden"}`}}
        >
            <div className = {'interpretation_image_quality_body_QHD'}>
            <div className = {"interpretation_image_quality_content_QHD"}>
                <div className = {'bold18white interpretation_image_quality_content_header_QHD'}>How was the image quality?</div>
                <div className = {'normal18FirGray interpretation_image_quality_content_normal_QHD'}>The following surveys are used as data to<div className = {'bold18white'}>improve the quality of images.</div> Thank you for your valuable comments.</div>
            </div>
            <div className = {"interpretation_image_quality_slider_QHD"}>
                <CustomDotInputSlider
                    min={1}
                    max={5}
                    onChange = {(value) => handleImgQualityChange(value)}
                    onAfterChange = {handleImageScoreSend}
                    marks = {marks}
                    value = {sendImgData.score}
                    isTipShow = {showImgQuality}
                />
            </div>
            <div className = {"interpretation_image_quality_check_QHD"}>
            <DarkCheckBox title = {"no seen for 5 days"} checked = {sendImgData.isCheck} onChange = {handleImgQualityChecked}/>
            </div>
            </div>
        </div>
    )

    const interpretation_body = (
        <div style = {{position:'relative'}}>
            {image_quality}
        <div className = {'interpretation_body_QHD'}>
            <div onClick = {()=>handleImgChange("od")} className = {isSelected? 'interpretation_photo_click' : 'interpretation_photo'}>
                {<ImageZoom src = {initData.shot.od === "init" ? "" : initData.shot.od === "" ? "none" : baseUrl + initData.shot.od} id = {initData._id}/>}
            </div>
            <div onClick = {()=>handleImgChange("os")} className = {isSelected === false? 'interpretation_photo_click' : 'interpretation_photo'}>
                {<ImageZoom src = {initData.shot.os === "init" ? "" : initData.shot.os === "" ? "none" : baseUrl + initData.shot.os} id = {initData._id}/>}
            </div>
            <div className = {'interpretation_list_QHD'}>        
                {interpretationList}
            </div>
        </div>
        </div>
    )

    const data_loading = (
        <div className = "loading_div">
            <div className = "loading_content_div">
                <Loader/>
                <span>loading...</span>
            </div>    
        </div>
    )

    return(
        <>
        {props.isDataLoading ? data_loading : interpretation_body}
        </>
    )  
}

const mapStateToProps = (state) => ({
    isDataLoading: state.LoaderReducer.isDataLoading,
    interpretationData: state.InterpretationDataReducer.interpretationData,
})
  
const mapDispatchToProps = {
    getInterpretationData: actions.GetInterpretationData,
    sendInterpretationData : actions.SendInterpretationData,
    sendImageQulityData : actions.SendImageQulityData,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Interpretation)
