import React, {useState, useContext, useEffect} from 'react'
import {Context} from "../../context";

import '../../../interface/css/guide/map/lines.css'

function Lines() {
    const {state} = useContext(Context)

    const [local, setLocal] = useState({
        content: null
    })

    const blueLineZones = new Set([
        'barrens',
        'stonetalon',
        'orgrimmar',
        'azshara',
        'badlands',
        'blasted',
        'darnassus',
        'durotar',
        'ironforge',
        'needles',
        'redridge',
        'stormwind',
        'tanaris',
        'westfall',
    ]);

    useEffect(() => {
        buildContent(state.route.path[state.currentStep].waypoints, state.route.path[state.currentStep].zone)
    }, [state.currentStep, state.route])

    function buildContent(waypoints, zone) {
        let content = []

        waypoints.forEach((waypoint, index) => {
            let nextWaypoint = waypoints[index + 1]

            if (nextWaypoint !== undefined) {
                if (blueLineZones.has(zone)) {
                    content.push(<line className={'blue-line'} x1={waypoint.coords.x + '%'} y1={waypoint.coords.y + '%'} x2={nextWaypoint.coords.x + '%'} y2={nextWaypoint.coords.y + '%'}/>)
                } else {
                    content.push(<line x1={waypoint.coords.x + '%'} y1={waypoint.coords.y + '%'} x2={nextWaypoint.coords.x + '%'} y2={nextWaypoint.coords.y + '%'}/>)
                }
            }
        })

        setLocal({
            ...local,
            content: content
        })
    }

    return (
        <React.Fragment>
            {local.content}
        </React.Fragment>
    )
}

export default Lines