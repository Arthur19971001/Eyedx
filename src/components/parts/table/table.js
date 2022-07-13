import React, { useEffect, useState } from 'react';
import { CustomLabel, CustomBoxLabel } from '../label/label';
import { connect } from 'react-redux'
import { ReactComponent as NoData } from "../../../images/no_data.svg";
import { BlueLoader } from '../../../components/loader/loader';
import "./table.css";

const ListLangModel = {
    basal_disease: "BASAL DISEASE",
    birthday: "BIRTH DATE",
    gender: "GENDER",
    inspection_place: "INSPECTION PLACE",
    order: "ORDER",
    program: "PROGRAM",
    status: "STATUS",
    waiting: "WAITING"
}

const DataTableModel = [
    {
        _id: "",
        interpretationDate: "",
        program: [""],
        birthday: "",
        gender: "",
        basalDisease: [""],
        place: "",
        status: ""
    },
]

const DataTable = (props) => {

    const [initListLang, setInitListLang] = useState(ListLangModel);
    const [initBodyList, setInitBodyList] = useState(DataTableModel);
    const [isListNull, setIsListNull] = useState(false);
    const stirngToObj = JSON.parse(localStorage.getItem("filter-value"));
    const year = localStorage.getItem("filter-value") !== null ? stirngToObj.lang === "kr" ? "년" : "year" : localStorage.getItem("lang") === "kr" ? "년" : "year";
    const updateListLang = props.list;
    const updateBodyList = props.tableBodyList;
    const size = props.size;

    useEffect(() => {
        if (updateListLang !== undefined && Object.keys(updateListLang).length !== 0) {
            setInitListLang(updateListLang);
        }

        if (updateBodyList === null) {
            setIsListNull(true);
        } else {
            if (updateBodyList !== undefined && updateBodyList.length !== 0) {
                setInitBodyList(updateBodyList);
                setIsListNull(false);
            }
        }
    }, [updateListLang, updateBodyList])

    const tableHeader = (
        <thead>
            <tr>
                <th>{initListLang.order}</th>
                <th>{initListLang.program}</th>
                <th>{initListLang.birthday}</th>
                <th>{initListLang.gender}</th>
                <th>{initListLang.basal_disease}</th>
                <th>{initListLang.inspection_place}</th>
                <th>{initListLang.status}</th>
            </tr>
        </thead>
    )

    const tableBody = (
        <tbody className='tbody_value'>
            {initBodyList.map((list, i) => (
                <tr key={list._id} className='table_body_list_tr'>
                    <td>{list.interpretationDate}</td>
                    <td>
                        <div className={"table_program_td_div_" + size}>{list.program.map((title, j) => (
                            <CustomLabel key={j} title={title} size={size} />))}</div></td>
                    <td>{list.birthday}</td>
                    <td>{list.gender}</td>
                    <td>
                        {list.basalDisease.length === 0 ? "-" : list.basalDisease.map((title, k) => (
                            <span key={k}>{title + year}{list.basalDisease.length - 1 === k ? "" : " / "}</span>
                        ))}</td>
                    <td>{list.place}</td>
                    <td>
                        <div className={"table_status_td_div"}>
                            <CustomBoxLabel title={list.status.toUpperCase()} backgroundColor={list.status.toUpperCase() === "HOLD" ? "#FFE4E4" : "#E4F3FF"} color={list.status.toUpperCase() === "HOLD" ? "#E50000" : "#0069BB"} />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    )

    const dataLoading = (
        <div className='loading_wrapper'>
            <div className="loading_blue_div">
                <div className="loading_content_blue_div">
                    <BlueLoader />
                    <span>loading...</span>
                </div>
            </div>
        </div>

    )

    const tableInfo = (
        isListNull ? <div className='table_wrapper'>
            <div className="no_data_div">
                <NoData className="no_data_img" />
            </div>
            <div className='table_div'>
                <table>
                    {tableHeader}
                </table>
            </div>
        </div> :
        <div className='table_wrapper'>
           <div className='table_div'>
                <table>
                    {tableHeader}
                    {tableBody}
                </table>
            </div> 
        </div>
            
        // <table>
        //        {tableHeader}
        //        {tableBody}
        //    </table> 
    )

    return (
        <>
            {/* {dataLoading} */}

            {props.isDataLoading ? dataLoading : tableInfo}
        </>
        // <>
        //     {props.isDataLoading ? dataLoading : tableInfo}
        // </>
        // <div className = 'table_wrapper'>
        //     {props.isDataLoading ? dataLoading : tableInfo}
        // </div>
    )
}

const mapStateToProps = (state) => ({
    isDataLoading: state.LoaderReducer.isDataLoading,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
