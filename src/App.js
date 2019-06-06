import React from 'react';

import {Provider} from './components/context';

import './interface/css/main.css';
import Guide from "./components/guide";
import Menu from "./components/menu";

function App() {
    return (
        <Provider>
            <Menu/>
            <Guide/>
        </Provider>
    )
}

export default App