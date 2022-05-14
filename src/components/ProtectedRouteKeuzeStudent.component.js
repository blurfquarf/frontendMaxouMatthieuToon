import React from "react";
import { Redirect, Route } from "react-router-dom";
const fase = JSON.parse(localStorage.getItem("current"));

const keuzeStudentStart = new Date(2022, 4, 1);
const keuzeStudentEind = new Date(2022, 4, 30);


function ProtectedRouteKeuzeStudent({ component: Component, ...restOfProps }) {
    let isfase = false;
    try{
        if(fase <= keuzeStudentEind && fase >= keuzeStudentStart){
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

export default ProtectedRouteKeuzeStudent;