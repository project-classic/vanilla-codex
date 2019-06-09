import React, {useContext, useState, useEffect} from 'react'

import '../../../interface/css/guide/panel/quests.css'
import {Context} from "../../context";

function Quests() {
    const {state, dispatch} = useContext(Context)

    const [local, setLocal] = useState({})

    useEffect(() => {
        dispatch({
            type: 'selectWaypoint',
            payload: state.route.path[state.currentStep].waypoints[0]
        })

        buildContent(state.route.path[state.currentStep].waypoints)
    }, [state.currentStep, state.route])

    function buildContent(waypoints) {
        let content = []
        waypoints.forEach((waypoint, index) => {
            content.push(<QuestGroup waypoint={waypoint} index={index}/>)
        })

        setLocal({
            content: content
        })
    }

    return (
        <div id={'quests'}>
            {local.content}
        </div>
    )
}

function QuestGroup({waypoint, index}) {
    let selected = false

    const {state, dispatch} = useContext(Context)

    const [local, setLocal] = useState({
        content: null,
        style: {}
    })

    useEffect(() => {
        if (waypoint === state.selectedWaypoint) {
            selected = true
        }

        buildContent(waypoint, selected)
    }, [waypoint, state.selectedWaypoint])

    function buildContent(waypoint, selected) {
        let content = []

        waypoint.objectives.forEach(objective => {
            content.push(<Quest objective={objective}/>)
        })

        setLocal({
            ...local,
            content: content,
            style: {
                border: selected ? '1px solid red' : null
            }
        })
    }

    function selectGroup() {
        dispatch({
            type: 'selectWaypoint',
            payload: waypoint
        })
    }

    return (
        <div className={'quest-group'} onClick={selectGroup} style={local.style}>
            <div className={'quest-group-title'}>{index + 1}.</div>
            {local.content}
        </div>
    )
}

function Quest({objective}) {
    if (objective.type === 'note') {
        return (
            <div className={'quest'} id={objective.type}>
                {objective.description}
            </div>
        )
    } else {
        return (
            <div className={'quest'} id={objective.type}>
                <a href={'https://classicdb.ch/?quest=' + objective.id} target={'_blank'} rel={'noopener noreferrer'}>
                    {objective.quest}
                </a>
                <div id={'description'}>
                    {objective.description}
                </div>
            </div>
        )
    }
}

export default Quests