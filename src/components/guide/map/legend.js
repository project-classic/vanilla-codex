import React, {useContext, useEffect, useState} from 'react'

import '../../../interface/css/guide/map/legend.css'
import {Context} from "../../context";

function Legend() {
    const {state, dispatch} = useContext(Context)

    const [local, setLocal] = useState({
        content: null,
        markers: null
    })

    useEffect(() => {
        setLocal({
            ...local,
            markers: state.currentMarkers
        })
    }, [state.currentMarkers])

    function do_something() {
        local.markers[0].visible = !local.markers[0].visible


        dispatch({
            type: 'toggleMarkers'
        })
    }
    return (
        <div id={'legend'} onClick={do_something}>testing</div>
    )
}

export default Legend