import React, {useContext} from 'react'
import {Context} from "./context";
import EventListener from "react-event-listener";

import '../interface/css/guide.css'

import Message from "./guide/message";
import Map from "./guide/map";
import Panel from "./guide/panel";

function Guide() {
    const {state} = useContext(Context);

    function keyEvent(event) {
        console.log('event happened')
        // key_listener(event, state, dispatch)
    }

    if (state.route !== null) {
        return (
            <div id={'content'}>
                <EventListener target={document} onKeyDown={keyEvent}/>
                <Message/>
                <Map/>
                <Panel/>
            </div>
        )
    } else {
        return null
    }
}

export default Guide