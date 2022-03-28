import React from "react";
import { Redirect, Route } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));



function ProtectedRoute({ component: Component, ...restOfProps }) {
    let isAuthenticated = false;
    if (user){
        isAuthenticated = true;
    }

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute;