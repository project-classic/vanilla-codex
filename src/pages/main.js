import React, {useContext} from 'react'
import {Context} from "../context";
import EventListener from "react-event-listener";

import '../interface/css/main.css'

import Message from "../components/message";
import Map from "../components/map";
import Panel from "../components/panel";

function Main() {
    const {state} = useContext(Context)

    function keyEvent(event) {
        console.log('event happened')
        // key_listener(event, state, dispatch)
    }

    if (state.route !== null) {
        return (
            <div id={'content'}>
                <EventListener target={document} onKeyDown={keyEvent} />
                <Message />
                <Map />
                <Panel />
            </div>
        )
    } else {
        return null
    }
}

export default Main