import React, {useContext, useState, useEffect} from 'react'
import {Context} from "../../context";

import '../../../interface/css/guide/panel/level.css'

function Level() {
    const {state} = useContext(Context)

    const [local, setLocal] = useState({
        level: 0,
        width: {}
    })

    useEffect(() => {
        const level = state.route.path[state.currentStep].experience.toFixed(2)

        setLocal({
            level: level,
            style: {
                style: level.split('.')[1] + '%'
            }
        })
    }, [state.currentStep, state.route])

    return (
        <div id={'level'}>
            <div id={'level-title'} className={'level-text'}>Level</div>
            <div id={'level-value'} className={'level-text'}>{local.level}</div>
            <div id={'level-bar'}/>
        </div>
    )
}

export default Level