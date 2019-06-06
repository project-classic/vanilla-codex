import React from 'react';

import {Provider} from './context';

import './interface/css/main.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "./pages/main";
import Menu from "./components/menu";

function App() {
    return (
        <BrowserRouter>
            <Provider>
                <Menu />
                <Switch>
                    <Route exact path={ '/' } component={ Main } />
                    <Route component={ Error } />
                </Switch>
            </Provider>
        </BrowserRouter>
    )
}

export default App