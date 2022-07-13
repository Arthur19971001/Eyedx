import React, {createContext,useState,useLayoutEffect, useEffect} from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect, useRouteMatch, useParams} from "react-router-dom";
import Interpretation from './interpretation/interpretation';
import Waiting from './waiting/waiting';
import {QHD,FHD,HD} from "../../common/MediaQuery";
import Themes from "../../common/theme";
import Header from "../../components/header/header";
import * as actions from "../../actions/langauge/waiting_list_lang";
import * as fetch from "../../actions/waiting/waiting_data";
import { connect } from 'react-redux'
import PrivateRoute from '../../common/private_route'
import ResponsLogin from "../login/login";
import Modal from "../../components/parts/modal/modal"
import { useHistory,useLocation } from 'react-router';
import {useCookies} from 'react-cookie';

// const ThemeContext = createContext(Themes.dark);

const HomeView = (props) =>{

  const [isShowModal, setIsShowModal] = useState(false);
  const [cookies,setCookie,removeCookie] = useCookies(['token']);
  const size = props.size;

  let sub_url = props.subUrl;
  let interpretationUrl = "/interpretation/"+sub_url;

  const history = useHistory();
  const location = useLocation();

  const onClickId = () => {
    if(isShowModal){
      setIsShowModal(false);
    } else {
      setIsShowModal(true);
    }
  }

  const Logout = () => {
    removeCookie('token');
    history.push("/");
  }

  const onClickClose = () => {
    if(isShowModal){
      setIsShowModal(false);
    }
  }

  return (
    <div onClick = {()=>onClickClose()}>
    <Router>
        <Header size = {size} tab = {props.tab} firstCode = {localStorage.getItem("first_code")} onClickId={()=>onClickId()}/>
          <Switch>
          <Route exact path = "/">
              <PrivateRoute/>
          </Route>
          <Route path = "/waiting">
            <Waiting listLang = {props.listLang} filterLang = {props.filterLang} filterValueLang = {props.filterValueLang} size = {size}/>
            <div style = {{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'fixed',
              right: '10px',
              top:'50px',
            }}>
              <Modal visibility = {isShowModal ? "visible" : "hidden"} list = {<p onClick = {()=>Logout()} style = {{color:'black' , cursor : 'pointer'}}>Log out</p>} right = {"10px"} width = {'163px'} top = {'-10px'} padding = {'0px 5px'}/>
            </div>
          </Route>
          <Route exact path = "/interpretation">
              {sub_url !== "" ? <Redirect to = {interpretationUrl}/> : <Redirect to = "waiting"/>}
          </Route>
          <Route path = "/interpretation/:userId">
            <Interpretation/>
            <div style = {{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'fixed',
              right: '10px',
              top:'50px',
            }}>
              <Modal visibility = {isShowModal ? "visible" : "hidden"} list = {<p onClick = {()=>Logout()} style = {{color:'black', cursor : 'pointer'}}>Log out</p>} right = {"10px"} width = {'163px'} top = {'-10px'} padding = {'0px 5px'}/>
            </div>
          </Route>
          <Route path = "/login" component = {ResponsLogin}/>
        </Switch>
    </Router>
    </div>
  );
}

const ResponsHome = (props) => {

  const size = props.size

  const [firstCode, setfirstCode] = useState("");

  useLayoutEffect(() => {
    const filterValue = JSON.parse(localStorage.getItem("filter-value"));
    props.getWaitingLang({lang:filterValue !== null ? filterValue.lang : localStorage.getItem("lang")});
    if(!props.isDataLoading){
      setfirstCode(localStorage.getItem("first_code"));
    }
  },[props.isDataLoading])

  return (
    <HomeView size = {size} subUrl = {firstCode} tab = {props.waitingListLang.tab} listLang = {props.waitingListLang.list} filterLang = {props.waitingListLang.filter} filterValueLang = {props.waitingListLang.filter_value}/>
  )
}

const mapStateToProps = (state) => ({
  waitingListLang: state.LangReducer.waitingListLang,
  isDataLoading : state.LoaderReducer.isDataLoading,
})

const mapDispatchToProps = {
  getWaitingLang: actions.GetWaitingListLang,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsHome)
