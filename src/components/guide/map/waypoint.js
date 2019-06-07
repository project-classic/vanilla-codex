import React, {useEffect, useState} from 'react'
import {sleep} from "../../../utils/util";

function Waypoint({waypoint, block}) {
    const [local, setLocal] = useState({
        position: {},
        alignment: null,
        number: null,
        space: null
    });

    useEffect(() => {
        setLocal({
            ...local,
            position: {
                left: waypoint.coords.x + '%',
                top: waypoint.coords.y + '%'
            },
            alignment: (waypoint.align === undefined) ? 'right' : waypoint.align,
            number: require('../../../interface/images/numbers/' + (block + 1) + '.png'),
            space: require('../../../interface/images/waypoints/space.png'),
        })
    }, [waypoint, block]);

    return (
        <div className={'waypoint'} style={local.position}>
            <img src={local.number} className={'waypointNumber'}/>
        </div>
    )
}

export default Waypoint