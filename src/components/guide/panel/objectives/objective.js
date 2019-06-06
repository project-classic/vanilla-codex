import React, {useContext, useState} from 'react'
import {Context} from "../../../context";

function Objective({index, quests, waypoint}) {
    const {state, dispatch} = useContext(Context);

    const [local, setLocal] = useState({
        style: null
    });

    function content() {
        let content = [];

        waypoint.objectives.forEach((objective, index) => {
            content.push(do_some_shit(objective, index))
        });

        return content
    }

    function do_some_shit(objective, index) {
        if (objective.type === 'note') {
            return (
                <div key={index} className={objective.type}>
                    <div>{objective.description}</div>
                </div>
            )
        } else {
            return (
                <div key={index} className={objective.type}>
                    <Single questName={objective.quest} description={objective.description}/>
                </div>
            )
        }
    }

    function doSomething() {
        dispatch({
            type: 'selectWaypoint',
            payload: waypoint
        });
        setLocal({
            ...local,
            style: {
                'borderColor': 'red',
                'border': '1px solid red'
            }
        })
    }

    return (
        <div className={'section'} onClick={doSomething} style={local.style}>
            <div className={'title'}>
                <div>{index + 1}. {waypoint.coords.x}</div>
                <div>{waypoint.coords.x + '.' + waypoint.coords.y}</div>
            </div>
            {content()}
        </div>
    )
}

function Single({questName, id, quests, description}) {
    return (
        <div>
            <a href={'https://classicdb.ch/?quest=200'} target={'_blank'} rel={'noopener noreferrer'}>
                {questName}
            </a>
            {description}
        </div>
    )
}

export default Objective