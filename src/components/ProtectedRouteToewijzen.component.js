import React from "react";
import { Redirect, Route } from "react-router-dom";
const fase = JSON.parse(localStorage.getItem("current"));

const toewijzingStart = new Date(2022, 5, 16);
const toewijzingEind = new Date(2022, 5, 20);

function ProtectedRouteToewijzen({ component: Component, ...restOfProps }) {
    let isfase = false;
    try{
        if(fase <= toewijzingEind && fase >= toewijzingStart){
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

export default ProtectedRouteToewijzen;