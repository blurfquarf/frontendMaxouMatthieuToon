import React from "react";
import { Redirect, Route } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));


function ProtectedRouteStudent({ component: Component, ...restOfProps }) {
    let isStudent = false;
    try {
        if (user.roles.includes("ROLE_STUDENT")) {
            isStudent = true;
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
                isStudent ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRouteStudent;