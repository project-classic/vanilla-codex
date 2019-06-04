import React, {useContext} from 'react';

import Map from './components/map';
import Panel from './components/panel';
import {Provider} from './/context';

import './interface/css/general.scss';
import Init from "./init";

function App() {
    return (
        <Provider>
            <Init />
                <div id={ 'innerbody' }>
                    <div className={ 'inner' }>
                        <div id={ 'map-wrapper' }>
                            <Map />
                        </div>
                        <div id={ 'panel-wrapper' }>
                            <Panel />
                        </div>
                    </div>
                </div>
        </Provider>
    )
}

export default App