import loadingGif from "./ok.gif"
import e from "./stick.gif"
import d from "./dw.gif"

import React, { Component } from "react";




class egg extends Component {
    render() {
        return (
            <div>
                <div>
                    <img src={loadingGif} alt="wait until the page loads" />
                    <img src={e} alt="wait until the page loads" />
                    <img src={d} alt="wait until the page loads" />
                    <img src={loadingGif} alt="wait until the page loads" />
                    <img src={e} alt="wait until the page loads" />
                    <img src={d} alt="wait until the page loads" />
                    <img src={loadingGif} alt="wait until the page loads" />
                    <img src={e} alt="wait until the page loads" />
                    <img src={d} alt="wait until the page loads" />
                    <img src={loadingGif} alt="wait until the page loads" />
                    <img src={e} alt="wait until the page loads" />
                    <img src={d} alt="wait until the page loads" />
                </div>
            </div>
        );
    }
}

export default egg;
