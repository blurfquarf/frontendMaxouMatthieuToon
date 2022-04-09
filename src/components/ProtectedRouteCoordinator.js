import React from "react";
import { Redirect, Route } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));


function ProtectedRouteCoordinator({ component: Component, ...restOfProps }) {
    let isCoordinator = false;
    try {
        if (user.roles.includes("ROLE_COORDINATOR")) {
            isCoordinator = true;
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
                isCoordinator ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRouteCoordinator;