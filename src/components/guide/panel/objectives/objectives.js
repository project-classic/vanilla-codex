import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../../../context";
import Objective from "./objective";

function Objectives({visible}) {
    const {state} = useContext(Context);

    const [local, setLocal] = useState({
        visibility: {
            display: 'block'
        },
        content: null
    });

    useEffect(() => {
        setLocal({
            ...local,
            visibility: {
                display: visible ? 'block' : 'none'
            }
        })
    }, [visible]);

    useEffect(() => {
        setLocal({
            ...local,
            content: state.route.path[state.currentStep].waypoints.map((waypoint, index) =>
                <Objective key={index} index={index} waypoint={waypoint} quests={state.route.quests}/>
            )
        })
    }, [state.currentStep, state.route]);

    return (
        <div id={'objectives'} style={local.visibility}>
            {local.content}
        </div>
    )
}

export default Objectives