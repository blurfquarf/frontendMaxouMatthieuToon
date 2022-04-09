import React from "react";
import { Redirect, Route } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));


function ProtectedRoutePromotor({ component: Component, ...restOfProps }) {
    let isPromotor = false;
    try {
        if (user.roles.includes("ROLE_PROMOTOR")) {
            isPromotor = true;
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
                isPromotor ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoutePromotor;