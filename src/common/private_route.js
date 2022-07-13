import React,{useLayoutEffect,useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({component: Component,...rest}) => {
    const [cookies] = useCookies(['token']);

    return (
        <Route
            {...rest}
            render = {props => 
                cookies.token === undefined ?( 
                    <Redirect to={{
                        pathname: '/login', 
                        state: {from: props.location}
                    }}
                />
            ): (
                <Redirect to= "/waiting"/>
            )}
        />
    )
}

export default PrivateRoute;