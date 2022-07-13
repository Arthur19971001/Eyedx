import React, {useLayoutEffect,} from 'react';
import ResponsLogin from "./pages/login/login";
import ResponsHome from "./pages/home/home";
import { createStore, applyMiddleware} from 'redux';
import { Provider } from "react-redux";
import { reducers } from "./reducers";
import thunk from 'redux-thunk';
import {BrowserRouter as Router,Switch,Route,Link, Redirect,useRouteMatch} from "react-router-dom";
import { withCookies } from 'react-cookie';
import PrivateRoute from './common/private_route';
import {LangCode} from './common/LangCode'
import {QHD,FHD,HD} from "./common/MediaQuery";
import {ResolutionError} from './pages/resolution_error/resolution';

const store = createStore(
  reducers, applyMiddleware(thunk)
)

const App =(props)=> {

  const size = props.size;
  return (
    <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute exact path = "/" component = {ResponsHome}/>
            <Route path = "/login"><ResponsLogin size = {size}/></Route>
            <Route path = "/"><ResponsHome size = {size}/></Route>
          </Switch>
        </Router>
    </Provider>
  )
}

const ResponsApp = () => {

  useLayoutEffect(()=>{
    localStorage.setItem("lang",LangCode(navigator.language || navigator.userLanguage));
  },[])

  return (
    <>
    <QHD>
      <App size = "QHD"></App>
    </QHD>
    <FHD>
      <App size = "FHD"></App>
    </FHD>
    <HD>
      <ResolutionError/>
    </HD>
  </>
  )
}

export default withCookies(ResponsApp);
