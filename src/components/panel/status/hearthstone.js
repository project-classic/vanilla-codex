import React, {useContext, useState, useEffect} from 'react'
import {Context} from "../../../context";

function Hearthstone() {
    const {state} = useContext(Context)

    const [local, setLocal] = useState({
        location: null
    })

    useEffect(() => {
        const filtered = state.route.hearthstones.filter(id => id.block < state.routeStep)
        let value = 'none'

        if (filtered.length !== 0) {
            value = filtered[filtered.length - 1].zone
        }

        setLocal({
            location: value
        })
    }, [state.routeStep, state.route])

    return (
        <div id={'hearthstone'} className={'split'}>
            <div>Hearthstone</div>
            <div>{local.location}</div>
        </div>
    )
}

export default Hearthstone