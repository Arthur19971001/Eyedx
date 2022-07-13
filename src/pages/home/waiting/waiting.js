import React, { useState, useEffect, useLayoutEffect } from 'react'
import {NormalButton} from '../../../components/parts/button/button';
import {CheckBox} from '../../../components/parts/check_box/check_box';
import Pager from '../../../components/parts/pager/pager';
import Selector from '../../../components/parts/selector/selector';
import DataTable from '../../../components/parts/table/table';
import { connect } from 'react-redux'
import {CustomInputRange, CustomInputSlider} from '../../../components/parts/input_range/input_range';
import { useHistory,useLocation } from 'react-router';
import * as actions from '../../../actions/waiting/waiting_data';
import {BlueLoader} from '../../../components/loader/loader';
import {useCookies} from 'react-cookie';
import queryString from 'query-string';
import "./waiting.css";

const FilterLangModel = {
    age: "Age",
    basal_disease: "Basal Disease",
    filter: "Filter",
    hold: "Hold",
    interpretation: "Interpretation",
    period: "Period",
    program: "Program",
    save: "Save the Filter",
    waiting: "Waiting"
}

const FilterValueLangModel = {
    basal_disease: {
        di: "Diabetes",
        hbp: "High Blood Pressure",
        n: "None"
    },
    gender: {
        f: "F",
        m: "M"
    },
    program: {
        dr: "Diabetic Retinopathy",
        edp: "Eye Disease Presence"
    },
    race: {
        asian: "Asian",
        ratin: "Ratin"
    },
    status: {
        0: "Waiting",
        50: "Hold"
    }
}

const FilterModel = {
    ageValue: [0,100],
    periodValue : 12,
    waitingValue : true,
    holdValue : true,
}

const basalDiseaseModel = {
    n : true,
    hbp : true,
    di : true,
}

const programModel = {
    dr : true,
    edp : true, 
}

const FilterReqModel = {
    lang: localStorage.getItem("lang"),
    pr: "p1,p2",
    bd: "n,d1,h1",
    age: "0,100",
    pe: 12,
    ns: "w,h",
    pn: 1,
}

const Waiting = (props) => {
    const [filterValue, setFilterValue] = useState(FilterModel);
    const [basalDiseaseValue, setBasalDiseaseValue] = useState(basalDiseaseModel);
    const [programValue, setProgramValue] = useState(programModel);
    const [initFilterLang,setInitFilterLang] = useState(FilterLangModel);
    const [initFilterValueLang, setInitFilterValueLang] = useState(FilterValueLangModel);
    const [filterReq, setFilterReq] = useState(FilterReqModel);
    const [cookies,setCookie,removeCookie] = useCookies(['token']);
    const [isFilterDisable, setIsFilterDisable] = useState(true);
    const [isDataEmpty, setIsDataEmpty] = useState(true);

    const [didMount, setDidMount] = useState(false);
    
    const size = props.size;
    const updateFilterLang = props.filterLang;
    const updateListLang = props.listLang;
    const updateFilterValueLang = props.filterValueLang;

    const history = useHistory();
    const location = useLocation();

    useLayoutEffect(() => {
        const queryObj = queryString.parse(location.search);
        if(cookies.token === undefined){ 
            history.push("/"); /// 로그인 유저가 아닐때
        } else {
            const queryJson = JSON.parse(localStorage.getItem("filter-value"));
            const queryStr = queryString.stringify(queryJson === undefined ? filterReq : queryJson,{arrayFormat: 'comma', encode: false});
            if(location.search === "") { /// "/waiting" 으로 접속했을때
                history.replace({ 
                    pathname : "/waiting",
                    search: `?${queryStr}` /// waiting 화면으로 다시 query 와 함께 보내기
                })
            } else { /// "/waiting?{query} 로 접속했을 때"
                if(Object.keys(queryObj).length === 7){ /// query filter 가 다 채워졌을 경우
                    setDidMount(true);
                    props.getWaitingData(queryObj,cookies.token.access_token);
                    setFilterReq(queryObj);
                } else { /// query filter 가 채워지지 않을 경우
                    const filter_data = {
                        lang: queryObj.lang !== undefined ? queryObj.lang : localStorage.getItem("lang"),
                        pr: queryObj.pr !== undefined ? queryObj.pr : "p1,p2",
                        bd: queryObj.bd !== undefined ? queryObj.bd : "n,d1,h1",
                        age: queryObj.age !== undefined ? queryObj.age : "0,100",
                        pe: queryObj.pe !== undefined ? parseInt(queryObj.pe,10): 12,
                        ns: queryObj.ns !== undefined ? queryObj.ns : "w,h",
                        pn: queryObj.pn !== undefined ? parseInt(queryObj.pn,10) : 1,
                    };
                    setFilterReq(filter_data);
                    props.getWaitingData(filter_data,cookies.token.access_token);
                }
            }  

            if(localStorage.getItem("error_value") === "true") { /// error 메세지 산출
                alert(localStorage.getItem("error_data"));
                localStorage.removeItem("error_value"); /// alert 후 지우기
                localStorage.removeItem("error_data"); /// alert 후 지우기
            }
        }

        return () => setDidMount(false);
    },[location.search])

    useEffect(() => {
        if(updateFilterLang !== undefined && Object.keys(updateFilterLang).length !== 0){
            setInitFilterLang(updateFilterLang);
        }

        if(updateFilterValueLang !== undefined && Object.keys(updateFilterValueLang).length !== 0) {
            setInitFilterValueLang(updateFilterValueLang);
        }

        if(!props.isDataLoading && props.waitingData !== undefined && Object.keys(props.waitingData).length !== 0){
            if(props.waitingData.List === null){
                setIsDataEmpty(true);
            } else {
                setIsDataEmpty(false);
            }
        }

        setBasalDiseaseValue({
            ...basalDiseaseValue,
            "n" : filterReq.bd.includes("n") ? true : false,
            "hbp" : filterReq.bd.includes("h1") ? true : false,
            "di" : filterReq.bd.includes("d1") ? true : false,
        });
        setProgramValue({
            ...programValue,
            "dr" : filterReq.pr.includes("p2") ? true : false,
            "edp" : filterReq.pr.includes("p1") ? true : false,
        });
        setFilterValue({
            ...filterValue,
            "ageValue" : filterReq.age.split(',').map(Number),
            "periodValue" : filterReq.pe,
            "waitingValue" : filterReq.ns.includes('w') ? true : false,
            "holdValue" : filterReq.ns.includes('h') ? true : false
        });

    },[updateFilterLang, updateFilterValueLang,filterReq,props.isDataLoading])

    const handleFilter = (e) => {
        e.preventDefault();
        const filter_data = {
            lang: localStorage.getItem("lang"),
            pr: programValue.dr && programValue.edp ? "p1,p2" : programValue.dr ? "p2" : programValue.edp ? "p1" : undefined,
            bd: basalDiseaseValue.n && basalDiseaseValue.hbp && basalDiseaseValue.di ? "n,d1,h1" : 
                basalDiseaseValue.n && basalDiseaseValue.hbp ? "n,h1" :
                basalDiseaseValue.n && basalDiseaseValue.di ? "n,d1" :
                basalDiseaseValue.hbp && basalDiseaseValue.di ? "d1,h1" :
                basalDiseaseValue.n ? "n" :
                basalDiseaseValue.hbp ? "h1" : 
                basalDiseaseValue.di ? "d1" : 
                undefined,
            age: `${filterValue.ageValue[0]},${filterValue.ageValue[1]}`,
            pe: filterValue.periodValue,
            ns: filterValue.waitingValue && filterValue.holdValue ? "w,h" : filterValue.waitingValue ? "w" : filterValue.holdValue ? "h" : undefined,
            pn: props.waitingData.Pagination.startPage,
        }
        setFilterReq(filter_data);
        setIsFilterDisable(true);
        history.push({
            pathname : "/waiting",
            search: `?${queryString.stringify(filter_data,{arrayFormat: 'comma', encode: false})}`
        })
    }

    const handlePagination = (e,type) => {
        e.preventDefault();
        let pn;
        switch(type) {
            case "preBlock" :
                pn = props.waitingData.Pagination.prevBlock === -1 ? props.waitingData.Pagination.startPage : props.waitingData.Pagination.prevBlock;
                break;
            case "prePage" :
                pn = props.waitingData.Pagination.prevPage === -1 ? props.waitingData.Pagination.startPage : props.waitingData.Pagination.prevPage;
                break;   
            case "nextPage":
                pn = props.waitingData.Pagination.nextPage === -1 ? props.waitingData.Pagination.endPage : props.waitingData.Pagination.nextPage;
                break;
            case "nextBlock":
                pn = props.waitingData.Pagination.nextBlock === -1 ? props.waitingData.Pagination.endPage : props.waitingData.Pagination.nextBlock;
                break;
            default :
                break;            
        }
        const filter_data = {
            lang: filterReq.lang,
            pr: filterReq.pr,
            bd: filterReq.bd,
            age: filterReq.age,
            pe: filterReq.pe,
            ns: filterReq.ns,
            pn: pn,
        }
        history.push({
            pathname : "/waiting",
            search: `?${queryString.stringify(filter_data,{arrayFormat: 'comma', encode: false})}`
        })     
    }

    const handleButtonEvent = (e,i) => {
        e.preventDefault();
        let pn;
        pn = i%5+1;
        const filter_data = {
            lang: filterReq.lang,
            pr: filterReq.pr,
            bd: filterReq.bd,
            age: filterReq.age,
            pe: filterReq.pe,
            ns: filterReq.ns,
            pn: pn,
        }
        history.push({
            pathname : "/waiting",
            search: `?${queryString.stringify(filter_data,{arrayFormat: 'comma', encode: false})}`
        }) 
    }

    const handleRangeChange = (value) => {
        setFilterValue({
            ...filterValue,
            "ageValue" : value,
        })
        if(isFilterDisable) {
            setIsFilterDisable(false)
        }
    }

    const handleSliderChange = (value) => {
        setFilterValue({
            ...filterValue,
            "periodValue" : value,
        })
        if(isFilterDisable) {
            setIsFilterDisable(false)
        }
    }

    const handleStatusChange = (value) => {
        switch (value) {
            case "waiting":
                if(filterValue.waitingValue && !filterValue.holdValue){
                    setFilterValue({
                        ...filterValue,
                        "holdValue" : false,
                        "waitingValue" : true,
                    })
                } else {
                    if(filterValue.waitingValue){
                        setFilterValue({
                            ...filterValue,
                            "waitingValue" : false,
                        }) 
                    } else {
                        setFilterValue({
                            ...filterValue,
                            "waitingValue" : true,
                        }) 
                    }
                }
                break;
            case "holding":
                if(!filterValue.waitingValue && filterValue.holdValue){
                    setFilterValue({
                        ...filterValue,
                        "holdValue" : true,
                        "waitingValue" : false,
                    })
                } else {
                    if(filterValue.holdValue){
                        setFilterValue({
                            ...filterValue,
                            "holdValue" : false,
                        }) 
                    } else {
                        setFilterValue({
                            ...filterValue,
                            "holdValue" : true,
                        }) 
                    }
                }
                break;
            default:
                break;
        }
        if(isFilterDisable) {
            setIsFilterDisable(false)
        }
    }

    const handleToPushPage = () => {
        let sub_url = localStorage.getItem("first_code");
        let url = "/interpretation/" + sub_url;
        history.push("/interpretation");
    }

    const onChangedBaselDisease = (value) => {
        switch(value) {
            case "n" : 
                if(basalDiseaseValue.n && !basalDiseaseValue.hbp && !basalDiseaseValue.di) {
                    setBasalDiseaseValue({
                        ...basalDiseaseValue,
                        "n" : true
                    });
                } else {
                    if(basalDiseaseValue.n) {
                        setBasalDiseaseValue({
                            ...basalDiseaseValue,
                            "n" : false
                        })
                    } else {
                        setBasalDiseaseValue({
                            ...basalDiseaseValue,
                            "n" : true
                        })
                    }
                }
                break;
            case "hbp" : 
                if(!basalDiseaseValue.n && basalDiseaseValue.hbp && !basalDiseaseValue.di) {
                    setBasalDiseaseValue({
                        ...basalDiseaseValue,
                        "hbp" : true
                    });
                } else {
                    if(basalDiseaseValue.hbp) {
                        setBasalDiseaseValue({
                            ...basalDiseaseValue,
                            "hbp" : false
                        })
                    } else {
                        setBasalDiseaseValue({
                            ...basalDiseaseValue,
                            "hbp" : true
                        })
                    }
                }
                break;
            case "di" : 
                if(!basalDiseaseValue.n && !basalDiseaseValue.hbp && basalDiseaseValue.di) {
                    setBasalDiseaseValue({
                        ...basalDiseaseValue,
                        "di" : true
                    });
                } else {
                    if(basalDiseaseValue.di) {
                        setBasalDiseaseValue({
                            ...basalDiseaseValue,
                            "di" : false
                        })
                    } else {
                        setBasalDiseaseValue({
                            ...basalDiseaseValue,
                            "di" : true
                        })
                    }
                }
                break;
            default:
                break; 
        }
        if(isFilterDisable) {
            setIsFilterDisable(false)
        }
    }

    const onChangeProgram = (value) => {
        switch(value) {
            case "dr" : 
                if(programValue.dr && !programValue.edp) {
                    setProgramValue({
                        ...programValue,
                        "dr" : true,
                    })
                } else {
                    if(programValue.dr) {
                        setProgramValue({
                            ...programValue,
                            "dr" : false,
                        })
                    } else {
                        setProgramValue({
                            ...programValue,
                            "dr" : true,
                        })
                    }
                }
                break;
            case "edp" : 
                if(!programValue.dr && programValue.edp) {
                    setProgramValue({
                        ...programValue,
                        "edp" : true,
                    })
                } else {
                    if(programValue.edp) {
                        setProgramValue({
                            ...programValue,
                            "edp" : false,
                        })
                    } else {
                        setProgramValue({
                            ...programValue,
                            "edp" : true,
                        })
                    }
                }
                break;
            default:
                break;
        } 
        if(isFilterDisable) {
            setIsFilterDisable(false)
        }
    }

    const FilterBox = (
        <div className = {'filter_type_div_'+size}>
            <div className = {'select_value_'+size}>
                <Selector title= {initFilterLang.program} list = {
                    <div>
                        <CheckBox title = {initFilterValueLang.program.dr} checked = {programValue.dr} onChange = {()=>onChangeProgram('dr')}/>
                        <CheckBox title = {initFilterValueLang.program.edp} checked = {programValue.edp} onChange = {()=>onChangeProgram('edp')}/>    
                    </div>
                    } name = {programValue.dr && programValue.edp ? `${initFilterValueLang.program.dr},${initFilterValueLang.program.edp}` : programValue.dr ? `${initFilterValueLang.program.dr}` : programValue.edp ? `${initFilterValueLang.program.edp}` : ""}/>
                <Selector title= {initFilterLang.basal_disease} list = {
                    <div>
                        <CheckBox title = {initFilterValueLang.basal_disease.n} checked = {basalDiseaseValue.n} onChange = {()=>onChangedBaselDisease('n')}/>
                        <CheckBox title = {initFilterValueLang.basal_disease.hbp} checked = {basalDiseaseValue.hbp} onChange = {()=>onChangedBaselDisease('hbp')}/>    
                        <CheckBox title = {initFilterValueLang.basal_disease.di} checked = {basalDiseaseValue.di} onChange = {()=>onChangedBaselDisease('di')}/>        
                    </div>
                }name = {basalDiseaseValue.n && basalDiseaseValue.hbp && basalDiseaseValue.di? 
                    `${initFilterValueLang.basal_disease.n},${initFilterValueLang.basal_disease.hbp},${initFilterValueLang.basal_disease.di}` : 
                    basalDiseaseValue.n && basalDiseaseValue.hbp ?  
                    `${initFilterValueLang.basal_disease.n},${initFilterValueLang.basal_disease.hbp}`:  
                    basalDiseaseValue.n && basalDiseaseValue.di ? 
                    `${initFilterValueLang.basal_disease.n},${initFilterValueLang.basal_disease.di}`: 
                    basalDiseaseValue.hbp && basalDiseaseValue.di ? 
                    `${initFilterValueLang.basal_disease.hbp},${initFilterValueLang.basal_disease.di}` :
                    basalDiseaseValue.n ? 
                    `${initFilterValueLang.basal_disease.n}`: 
                    basalDiseaseValue.hbp ? 
                    `${initFilterValueLang.basal_disease.hbp}`: 
                    basalDiseaseValue.di ? 
                    `${initFilterValueLang.basal_disease.di}` : 
                    ""}/>
                <div className = 'range_slider_with_label'>
                    <span className = "range_sldier_title">
                        {initFilterLang.age}
                    </span>
                    <CustomInputRange 
                        min={0}
                        max={100}
                        onChange = {(value) => handleRangeChange(value)}
                        value = {filterValue.ageValue}/> 
                </div>
                <div className = 'range_slider_with_label'>
                    <span className = "range_sldier_title">
                        {initFilterLang.period}
                    </span>
                    <CustomInputSlider 
                        min={0}
                        max={12}
                        onChange = {(value) => handleSliderChange(value)}
                        value = {filterValue.periodValue}/> 
                </div>
                <CheckBox checked={filterValue.waitingValue} title = {initFilterLang.waiting}
                    onChange = {()=>handleStatusChange('waiting')} />
                <CheckBox checked={filterValue.holdValue} title = {initFilterLang.hold} onChange = {()=>handleStatusChange('holding')} />
            </div>
            <NormalButton title = 'Apply Filter' disabled = {isFilterDisable} width = {'160px'} onClick = {handleFilter}/> 
        </div>
    )

    const SavedFilterBox = (
        <div className = {'saved_filter_div_'+size}>
            <NormalButton title = 'Interpretation' disabled = {isDataEmpty} width = {'200px'} onClick = {handleToPushPage}/>  
        </div>
    )

    const infoTable = (
        <DataTable size = {size} tableBodyList = {props.waitingData.List} list = {updateListLang}/>
    )

    const PagerBox = (
        <div className = 'pager_form_div'>
            <Pager 
                buttons = {props.waitingData.Pagination}
                currentPage = {filterReq.pn}
                buttonsEvent = {(e,i) => handleButtonEvent(e,i)}
                onClickPreBlock = {(e) => handlePagination(e,'preBlock')}
                onClickPrePage = {(e) => handlePagination(e,'prePage')}
                onClickNextPage = {(e) => handlePagination(e,'nextPage')}
                onClickNextBlock = {(e) => handlePagination(e,'nextBlock')}
            />
        </div>
    )
    
    const formBody = (
        <div className = {"waiting_form_div_"+size}>
            {FilterBox}
            {SavedFilterBox}
            {infoTable}
            {PagerBox}
            {/* <div style = {{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                {infoTable}
                {PagerBox}
            </div> */}
        </div>
    )

    return (
        <div className = {'waiting_background_div_'+size}>
            {formBody}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isDataLoading: state.LoaderReducer.isDataLoading,
    waitingData: state.WaitingDataReducer.waitingData
})
  
const mapDispatchToProps = {
    getWaitingData: actions.GetWaitingData,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Waiting)
  
