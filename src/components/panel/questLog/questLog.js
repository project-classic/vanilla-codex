import React, {useContext, useState, useEffect} from 'react'
import {Context} from "../../../context";
import getQuestLog from "../../../utils/quests";
import Quest from "./quest";

function QuestLog({visible}) {
    const {state} = useContext(Context)

    const [local, setLocal] = useState({
        visibility: null,
        content: []
    })

    useEffect(() => {
        setLocal({
            ...local,
            visibility: {
                display: visible ? 'block' : 'none'
            }
        })
    }, [visible])

    useEffect(() => {
        const quests = getQuestLog(state.route, state.routeStep)

        setLocal({
            ...local,
            content: quests.map((quest, index) =>
                <Quest key={index} quest={quest} quests={state.route.quests} />
            )
        })
    }, [state.routeStep, state.route])

    return (
        <div id={'quests'} style={ local.visibility }>
            <div className="section">
                <div className="title">
                    <div>Current Quests</div>
                    <div>{ local.content.length } / 20</div>
                </div>
                { local.content }
            </div>
        </div>
    )
}

export default QuestLog