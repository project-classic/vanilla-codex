import React, {useContext, useState, useEffect} from 'react'
import Line from "./line";
import Waypoint from "./waypoint";
import {Context} from "../../context";

function RouteSteps() {
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
    ])

    useEffect(() => {
        const waypoints = state.route.path[state.routeStep].waypoints
        const offColor = blueLineZones.has(state.route.path[state.routeStep].zone)

        setLocal({
            ...local,
            content: waypoints.map((waypoint, index) =>
                <React.Fragment key={index}>
                    <Line currentWaypoint={waypoint} nextWaypoint={waypoints[index + 1]} offColor={offColor} />
                    <Waypoint waypoint={waypoint} block={index} />
                </React.Fragment>
            )
        })
    }, [state.routeStep, state.route])

    return local.content
}

export default RouteSteps