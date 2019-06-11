import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../../context";

import '../../../interface/css/guide/panel/quests.css'
import '../../../interface/css/guide/panel/quest-log.css'
import getQuestLog from "../../../utils/quests";

function QuestLog({visible}) {
    const {state} = useContext(Context)

    const [local, setLocal] = useState({
        content: [],
        style: {
            display: 'none'
        }
    })

    useEffect(() => {
        setLocal({
            ...local,
            style: {
                display: visible ? 'grid' : 'none'
            }
        })
    }, [visible])

    useEffect(() => {
        buildContent(state.currentStep, state.route)
    }, [state.currentStep, state.route])

    function buildContent(currentStep, route) {
        let content = []

        const quests = getQuestLog(route, currentStep)

        quests.forEach(quest => {
            content.push(<div key={content.length} className={'quest-log-item'}><div>{quest}</div></div>)
        })

        setLocal({
            ...local,
            content: content
        })
    }

    return (
        <div id={'quest-log'} style={local.style}>
            <div className={'quest-group'}>
                <div className={'quest-log-title'}>
                    Your quests
                    <div className={'quest-log-title-progress'}>
                        {local.content.length} / 20
                    </div>
                </div>
                {local.content}
            </div>
        </div>
    )
}

export default QuestLog