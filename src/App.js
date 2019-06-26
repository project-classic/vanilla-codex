import React from 'react';

import {Provider} from './components/context';

import './interface/css/main.css';
import Guide from "./components/guide";

function App() {
    return (
        <Provider>
            <Guide/>
        </Provider>
    )
}

export default App