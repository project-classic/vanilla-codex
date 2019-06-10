import React, {useContext} from 'react'
import {Context} from "./context";
import EventListener from "react-event-listener";

import '../interface/css/guide.css'

import Message from "./guide/message";
import Map from "./guide/map";
import Panel from "./guide/panel";

function Guide() {
    const {state, dispatch} = useContext(Context);

    function keyEvent(event) {
        console.log(event.key.toLowerCase())
        if (event.key.toLowerCase() === 'd') {
            dispatch({
                type: 'nextWaypoint'
            })
        } else if (event.key.toLowerCase() === 'a') {
            dispatch({
                type: 'previousWaypoint'
            })
        }

        // key_listener(event, state, dispatch)
    }

    if (state.route !== null) {
        return (
            <div id={'guide'}>
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