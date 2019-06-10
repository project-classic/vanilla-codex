import React, {useEffect, useState, useContext} from 'react'
import {Context} from "../../context";

import '../../../interface/css/guide/map/waypoints.css'

function Waypoints() {
    const {state} = useContext(Context)

    const [local, setLocal] = useState({
        content: null
    });

    useEffect(() => {
        buildContent(state.route.path[state.currentStep].waypoints)
    }, [state.currentStep, state.route]);

    function buildContent(waypoints) {
        let content = []

        waypoints.forEach((waypoint, index) => {
            let number = index + 1
            let style = {
                left: 'calc(' + waypoint.coords.x + '% - 6px)',
                top: 'calc(' + waypoint.coords.y + '% - 6px)'
            }

            content.push(<img key={content.length} src={require('../../../interface/images/numbers/' + number + '.png')} className={'waypoint'} style={style} alt={''}/>)
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

export default Waypoints