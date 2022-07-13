import React, {useLayoutEffect} from 'react';
import {ReactComponent as Logo} from "../../images/logo_eyedx.svg";
import {QHD,FHD,HD} from "../../common/MediaQuery";
import "./login.css";
import LoginForm from '../../components/login_form/login_form';
import {LangCode} from '../../common/LangCode';
import { connect } from 'react-redux';
import * as actions from '../../actions/langauge/login_lang'

const LoginView = (props) => {

  const size = props.size;

  return(
    <div className = {'login_view_header'}>
      <div className = {'login_view_logo_div'}>
        <Logo className = {"login_view_logo"}/>
      </div>
      <div className = 'login_view_position'>
        <LoginForm size = {size} loginLang = {props.loginLang}/>
      </div>
    </div>
  );
}

const ResponsLogin = (props) => {
  
  const size = props.size;

  useLayoutEffect(() => {
    props.getLoginLang({lang:window.localStorage.getItem("lang")});
  }, [])

  return (
    <LoginView size = {size}/>
  );
}

const mapStateToProps = (state) => ({
  loginLangs: state.LangReducer.loginLang
})

const mapDispatchToProps = {
  getLoginLang: actions.GetLoginLang,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsLogin);