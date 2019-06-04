import React from 'react';

import {Provider} from './context';

import './interface/css/general.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "./pages/main";

function App() {
    return (
        <BrowserRouter>
            <Provider>
                <Switch>
                    <Route exact path={ '/' } component={ Main } />
                    <Route component={ Error } />
                </Switch>
            </Provider>
        </BrowserRouter>
    )
}

export default App