import React, {useContext, useEffect, useState} from 'react'

import '../../../interface/css/guide/map/legend.css'
import {Context} from "../../context";

function Legend() {
    const {state} = useContext(Context)

    const [local, setLocal] = useState({
        content: null
    })

    useEffect(() => {
        buildContent(state.currentMarkers)
    }, [state.currentMarkers])

    function buildContent(markers) {
        let content = []
        let markerNames = []

        if (markers !== null) {
            markers.forEach(marker => {
                if (!markerNames.includes(marker.name)) {
                    content.push(<LegendMarker key={content.length} marker={marker}/>)
                    content.push(<div key={content.length} className={'legend-text'}>{marker.name}</div>)

                    markerNames.push(marker.name)
                }
            })
        }

        setLocal({
            content: content
        })
    }

    return (
        <div id={'legend-container'}>
            <div id={'legend-header'}>Legend:</div>
            {local.content}
        </div>
    )
}

function LegendMarker({marker}) {
    const {dispatch} = useContext(Context)

    const [local, setLocal] = useState({
        color: marker.color
    })

    useEffect(() => {
        setLocal({
            color: marker.color
        })
    }, [marker])

    function toggleMarker() {
        marker.visible = !marker.visible

        setLocal({
            color: marker.visible ? marker.color : 'transparent'
        })

        dispatch({
            type: 'toggleMarker'
        })
    }

    return (
        <div className={'legend-marker'} onClick={toggleMarker} style={{backgroundColor: local.color}}/>
    )
}

export default Legend