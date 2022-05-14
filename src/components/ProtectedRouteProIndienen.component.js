import React from "react";
import { Redirect, Route } from "react-router-dom";
const fase = JSON.parse(localStorage.getItem("current"));
const user = JSON.parse(localStorage.getItem("user"));


const indienenPromotorStart = new Date(2022, 2, 8);
const indienenPromotorEind = new Date(2022, 3, 30);


function ProtectedRouteProIndienen({ component: Component, ...restOfProps }) {
    let isfase1 = false;
    try{
        if(user.roles.includes("ROLE_STUDENT") && fase <= indienenPromotorEind && fase >= indienenPromotorStart){
            isfase1 = true;
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
                isfase1 ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRouteProIndienen;