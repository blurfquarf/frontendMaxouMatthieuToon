import React from "react";
import { Redirect, Route } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));


function ProtectedRouteBedrijf({ component: Component, ...restOfProps }) {
    let isBedrijf = false;
    try {
        if (user.roles.includes("ROLE_BEDRIJF")) {
            isBedrijf = true;
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
                isBedrijf ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRouteStudent;