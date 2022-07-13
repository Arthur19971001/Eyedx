import React, {useState,useEffect, useLayoutEffect} from 'react'
import { connect } from 'react-redux'
import "./login_form.css";
import {ReactComponent as Logo} from "../../images/logo_eyedx.svg";
import {ReactComponent as Icon} from "../../images/eye_line.svg";
import {passwordValid, IDValid} from "../../common/vaildate";
import { useHistory } from 'react-router';
import {useCookies} from 'react-cookie';
import * as actions from '../../actions/login/login';

const loginModel = {
    id: "",
    password: "",
    isRole: true,
    isRember: true,
}

const errorModel = {
    idError: "",
    passwordError: "",
}

const loginLangModel = {
    error: {
        blank_id: "Please enter your ID.",
        blank_password: "Please enter your Password.",
        invalid_interpretation_id: "Not a valid interpretating ID. Please check your ID again.",
        invalid_operation_id: "Not a valid operating ID. Please check your ID again.",
        not_match_format_id: "ID does not match the standard. Please check your ID again.",
        not_match_format_password: "Password does not match the standard. Please check your password again."
    },
    id: "ID",
    interpretaton_id: "Interpretation ID",
    login: "Log in",
    password: "Password",
    please_enter_your_id: "Please Enter Your ID",
    please_enter_your_password: "Please Enter Your Password",
    process_login: "Log In",
    remember_account: "Remember Account"
}

const LoginForm = (props) => {
    const [errors, setErrors] = useState(errorModel);
    const [formValue, setFormValue] = useState(loginModel);
    const [isShowPassword, setIsShowPassowrd] = useState(false);
    const [initLoginLang, setInitLoginLang] = useState(loginLangModel);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [errorFromServer, setErrorFromServer] = useState("");

    const updateLoginLang = props.loginLang;

    const history = useHistory();

    const handleHoldStart = (e) =>{
        setIsShowPassowrd(true);
    }

    const handleHoldEnd = (e) => {
        setIsShowPassowrd(false);
    }

    const handleIDChange = e => {
        const {id, value} = e.target;
        setFormValue({
            ...formValue,
            "id":value
        })
    }

    const handlePassowrdChange = e => {
        const {password, value} = e.target;
        setFormValue({
            ...formValue,
            "password":value
        })
    }

    const handleRoleChange = () => {
        formValue.isRole ? setFormValue({
            ...formValue,
            "isRole":false,
        }) : setFormValue({
            ...formValue,
            "isRole":true,
        })
    }

    const handleRemberChange = () => {
        if(formValue.isRember){
            setFormValue({
            ...formValue,
            "isRember":false,});
        } else {
             setFormValue({
            ...formValue,
            "isRember":true});
        }
       
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const login_req = {
            id: formValue.id,
            pwd: formValue.password,
            level: formValue.isRole ? 100 : 0,
            lang: localStorage.getItem("lang"),
        }
        console.log(login_req);
        localStorage.setItem("userID",formValue.id);
        props.reqLogin(login_req, onSucessful, onFailure);
    }

    const onSucessful = (token) => {
        setCookie('token',token);
        history.push('/');
    }

    const onFailure = (massage) => {
        setErrorFromServer(massage);
    }

    const vaildate = (e) => {
        e.preventDefault();
        let temp = errors;
        if(IDValid(formValue.id) === "empty"){
            temp.idError = initLoginLang.error.blank_id;
        } else if(IDValid(formValue.id) === "invalid"){
            temp.idError = initLoginLang.error.not_match_format_id;
        } else if(IDValid(formValue.id) === "valid") {
            temp.idError = undefined;
        }
        if(passwordValid(formValue.password) === "empty") {
            temp.passwordError = initLoginLang.error.blank_password;
        } else if(passwordValid(formValue.password) === "invalid"){
            temp.passwordError = initLoginLang.error.not_match_format_password;
        } else if(passwordValid(formValue.password) === "valid"){
            temp.passwordError = undefined;
        }
        setErrors({
            ...temp,
        })

        if(temp.idError === undefined && temp.passwordError === undefined){
            handleSubmit(e);
        }
    }

    useLayoutEffect(()=>{
        // debugger;
        if(!window.location.hash){
            window.location = window.location + '#loaded';
            window.location.reload();
        } 
    },[])

    useEffect(() => {
        if(updateLoginLang !== undefined){
            if(Object.keys(updateLoginLang).length !== 0){
                setInitLoginLang(updateLoginLang);
            }
        }
        if(errorFromServer !== ''){
            alert(errorFromServer);
        }
    },[errorFromServer,updateLoginLang])

    const LoginFormHeader = (
        <div className = {'login_header_'+props.size}>
            <div className = {'login_header_title_'+props.size}>
                {initLoginLang.login}
            </div>
        </div>
    )

    const LoginFromBody = (
        <div className = {'login_body_'+props.size}>
            <div className = {'login_body_content_'+props.size}>
                <Logo className = {"login_body_logo_"+props.size}/>
                <form name = 'login_form' onSubmit = {handleSubmit}>
                    <div className = {'check_id_'+props.size}>
                        <label className = {'check_id_label_'+props.size}>
                        <input type = 'checkbox' checked={formValue.isRole} onChange={handleRoleChange} className = {'check_id_checkbox_'+props.size}></input>
                            <span className = {'check_label_'+props.size}>{initLoginLang.interpretaton_id}</span>
                        </label>
                    </div>
                    <div className = {'input_title_'+props.size}>
                        <span className = {'input_title_name_'+props.size}> {initLoginLang.id} </span>
                        <span className = {'input_title_error_'+props.size}> {errors.idError} </span>
                    </div>
                    <div className = {'input_email_wrap_'+props.size}>
                    <input type = 'text' onChange={handleIDChange} label='id' placeholder={initLoginLang.please_enter_your_id} className = {'input_'+props.size}></input>
                    </div>
                    <div className = {'input_title_'+props.size}>
                        <span className = {'input_title_name_'+props.size}> {initLoginLang.password} </span>
                        <span className = {'input_title_error_'+props.size}> {errors.passwordError} </span>
                    </div>
                    <div className = {'input_password_wrap_'+props.size}>
                    <input type = {isShowPassword ? 'text' : 'password'} onChange={handlePassowrdChange} label='password' placeholder={initLoginLang.please_enter_your_password} className = {'input_'+props.size}></input>
                        <div onMouseDown={handleHoldStart} onMouseUp={handleHoldEnd} ><Icon className = {isShowPassword ? "passowrd_icon_color_"+props.size : "passowrd_icon_"+props.size}/></div>
                    </div>
                    <div className = {'input_password_wrap_'+props.size}>
                    <input type = "submit" value={initLoginLang.process_login} className = {'sumbit_btn_'+props.size}></input>
                    </div>
                    <div className = {'check_remember_'+props.size}>
                        <label className = {'check_id_label_'+props.size}>
                        <input type = 'checkbox' checked={formValue.isRember} onChange={handleRemberChange} className = {'check_id_checkbox_'+props.size}></input>
                            <span className = {'check_label_'+props.size}> {initLoginLang.remember_account}</span>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )

    return (
        <div>
            {LoginFormHeader}
            {LoginFromBody}
        </div>
    )    
}

const mapStateToProps = (state) => ({
    //loginLangs: state.LangReducer.loginLang,
    loginRes: state.LoginReducer.loginRes,
})
  
const mapDispatchToProps = {
    //getLoginLang: actions.GetLoginLang,
    reqLogin: actions.RequestLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
