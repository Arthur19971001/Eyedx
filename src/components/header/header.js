import React,{useContext,useState,useEffect,createContext, useLayoutEffect,} from 'react';
import { connect } from 'react-redux'
import {ReactComponent as Logo} from "../../images/logo_eyedx.svg";
import {BrowserRouter as Router,Switch,Route,Link, Redirect,useRouteMatch, useHistory} from "react-router-dom";
import "./header.css";
import Themes from "../../common/theme";
import Modal from "../../components/parts/modal/modal"

const tabLangModel = {
  waiting : "Waiting",
  interpretation : "Interpretation",
}
const TabButton = (props) => {
  const size = props.size;

    return (
      <Link to = {props.to} style = {{ color: `${props.value ? props.color : "#9F9F9F"}`}}>
        <button 
          className = {props.value ? 'home_tab_active_'+size : 'home_tab_inactive_'+size}
          style = {{
            borderBottom:`3px solid ${props.value ? props.color : 'transparent'}`,
            color: `${props.value ? props.color : "#9F9F9F"}`,
          }}>
          {props.title}
        </button></Link>
    )
}

const Header = (props) => {
  const [initTabLang, setInitTabLang] = useState(tabLangModel);
  const [headerColor, setHeaderColor] = useState(Themes.blue);
  const updateTabLang = props.tab;
  const size = props.size;
  
  const url = "/interpretation";

  useEffect(() => {
    if(updateTabLang !== undefined && Object.keys(updateTabLang).length !== 0){
      setInitTabLang(updateTabLang);
    }

    if(props.headerColorData[0]){
      setHeaderColor(Themes.blue)
    } else {
      if(props.headerColorData[1]){
        setHeaderColor(Themes.dark)
      }
    }
  })

  const header = (
      <div className = {'header_'+size} 
        style = {{
          borderBottom:headerColor.border, 
          backgroundColor: headerColor.backgroundColor,
        }}>
          <div className = {'header_logo_wrap_'+size}>
            <div className = {'header_logo_div_'+size}
        style = {{
          backgroundColor:headerColor.logoBackgroundColor,
          borderBottom:headerColor.border,
        }}>
          <Logo className = {'header_logo_'+size} fill = {headerColor.fillColor}/>
        </div> 
          </div>
          <ul className = {'tabs_ul'}>
              <TabButton size = {size} theme = {headerColor} value = {props.headerColorData[0]} to = "/waiting" title = {initTabLang.waiting} color = {headerColor.mainColor}/> 
              <TabButton size = {size} theme = {headerColor} value = {props.headerColorData[1]} to = {url} title = {initTabLang.interpretation} color = {headerColor.mainColor}/>
          </ul>
        <div className = {'header_login_info_div_'+props.size}
          style = {{
            borderLeft: headerColor.border,
          }}>
            <div>
          <p style = {{cursor:'pointer'}}
            onClick = {props.onClickId}> {localStorage.getItem("userID")}
          </p>
          </div>
        </div>
      </div>
  )

  return (
    <>
    {header}
    </>
  )
}

const mapStateToProps = (state) => ({
  headerColorData: state.HeaderColorDataReducer.headerColorData,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
