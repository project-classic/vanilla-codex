import React, {useContext, useEffect, useState} from 'react'
import Line from "./line";
import Waypoint from "./waypoint";
import {Context} from "../../context";
import Markers from "./markers";

function Steps() {
    const {state} = useContext(Context);

    const [local, setLocal] = useState({
        content: null
    });

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

    function some_shit(waypoints, offColor) {
        let content = []
        waypoints.forEach((waypoint, index) => {
            content.push(<Line currentWaypoint={waypoint} nextWaypoint={waypoint[index + 1]} offColor={offColor}/>)
            content.
        })
    }

    useEffect(() => {
        const waypoints = state.route.path[state.currentStep].waypoints;
        const offColor = blueLineZones.has(state.route.path[state.currentStep].zone);

        setLocal({
            ...local,
            content: waypoints.map((waypoint, index) =>
                <React.Fragment key={index}>
                    <Line currentWaypoint={waypoint} nextWaypoint={waypoints[index + 1]} offColor={offColor}/>
                    <foreignObject width={'100%'} height={'100%'}>
                        <Markers/>
                        <Waypoint waypoint={waypoint} block={index}/>
                    </foreignObject>
                </React.Fragment>
            )
        })
    }, [state.currentStep, state.route]);

    return local.content;
}

export default Steps