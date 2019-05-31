import React from 'react';

import Map from './components/map';
import Panel from './components/panel';

function App() {
    return (
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
    )
}

export default App