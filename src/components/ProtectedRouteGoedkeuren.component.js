import React from "react";
import { Redirect, Route } from "react-router-dom";
const fase = JSON.parse(localStorage.getItem("current"));

const goedkeurenStart = new Date(2022, 2, 8);
const goedkeurenEind = new Date(2022, 3, 31);

function ProtectedRouteGoedkeuren({ component: Component, ...restOfProps }) {
    let isfase = false;
    try{
        if(fase <= goedkeurenEind && fase >= goedkeurenStart){
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

export default ProtectedRouteGoedkeuren;