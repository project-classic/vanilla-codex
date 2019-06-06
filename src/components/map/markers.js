import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../../context";
import units from "../../resources/units";
import quests from '../../resources/quests';

function Marker() {
    const {state} = useContext(Context)

    const [local, setLocal] = useState({
        waypoint: null,
        content: null
    })

    useEffect(() => {
        setLocal({
            ...local,
            waypoint: state.selectedWaypoint,
            content: buildContent(state.selectedWaypoint)
        })

    }, [state.selectedWaypoint])

    function buildContent(waypoint) {
        let content = []
        waypoint.objectives.forEach(objective => {
            if (objective.type === 'accept') {
                if (quests[objective.id].start.type === 'npc') {
                    units[quests[objective.id].start.id].locations.forEach(location => {
                        //TODO: CHECK IF IN THE SAME ZONE
                        content.push(<Point position={{left: location.coords.x + '%', top: location.coords.y + '%'}}/>)
                    })
                }
            }
        })

        return content
    }

    return local.content
}

function Point({position}) {
    return (
        <foreignObject width={'100%'} height={'100%'}>
            <div className={'waypoint'} style={position}>
                <img src={require('../../interface/images/waypoints/space.png')} id={'quest'} alt={''} />
            </div>
        </foreignObject>
    )
}

export default Marker
