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

        buildContent(state.currentMarkers)

    }, [state.currentMarkers])

    function buildContent(markers) {
        let content = []

        if (markers !== null) {
            markers.forEach(marker => {
                content.push(<div className={'legend-marker'} onClick={do_something} style={{backgroundColor: marker.color}}/>)
                content.push(<div className={'legend-text'}>{marker.locations[0].coords.x}</div>)
            })
        }

        setLocal({
            ...local,
            content: content
        })
    }
    function do_something() {
        local.markers[0].visible = !local.markers[0].visible


        dispatch({
            type: 'toggleMarkers'
        })
    }
    return (
        <div id={'legend-container'}>
            <div id={'legend-header'}>Legend:</div>
            {local.content}
        </div>
    )
}
export default Legend