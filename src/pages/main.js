import React, {useContext} from 'react'
import {Context, Provider} from "../context";
import EventListener from "react-event-listener";

import '../interface/css/innerbody.scss';

import Message from "../components/message";
import Map from "../components/map";
import Panel from "../components/panel";

function Main() {
    const {state, dispatch} = useContext(Context)

    function keyEvent(event) {
        console.log('event happened')
        // key_listener(event, state, dispatch)
    }

    if (state.route !== null) {
        return (
            <div id={ 'innerbody' }>
                <EventListener target={document} onKeyDown={keyEvent} />
                <Message />
                <div className={ 'inner' }>
                    <div id={'map-wrapper'}>
                        <Map />
                    </div>
                    <div id={'panel-wrapper'}>
                        <Panel />
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Main