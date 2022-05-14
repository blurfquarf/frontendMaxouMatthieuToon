import React from "react";
import { Redirect, Route } from "react-router-dom";
const fase = JSON.parse(localStorage.getItem("current"));

const boostStart = new Date(2022, 5, 1);
const boostEind = new Date(2022, 5, 15);


function ProtectedRouteBoost({ component: Component, ...restOfProps }) {
    let isfase = false;
    try{
        if(fase <= boostEind && fase >= boostStart){
            isfase = true;
        }
    }
    catch (err){
        return (
            <Route
                {...restOfProps}
                render={(props) =>
                    <Redirect to="/"/>
                }
            />);
    }

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isfase ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRouteBoost;