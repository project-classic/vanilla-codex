import React from 'react'

function Objective({index, quests, waypoint}) {
    function content() {
        let content = []

        waypoint.objectives.forEach(objective => {
            content.push(do_some_shit(objective))
        })

        return content
    }

    function do_some_shit(objective) {
        if (objective.type === 'note') {
            return (
                <div className={objective.type}>
                    <div>{objective.description}</div>
                </div>
            )
        } else {
            return (
                <div className={objective.type}>
                    <Single questName={objective.quest} />
                </div>
            )
        }
    }

    return (
        <div className={'section'}>
            <div className={'title'}>
                <div>{index + 1}. {waypoint.header}</div>
                <div>{waypoint.coords.x + '.' + waypoint.coords.y}</div>
            </div>
            {content()}
        </div>
    )
}

function Single({questName, id, quests}) {
    return (
        <div>
            <a href={'https://classicdb.ch/?quest=' + '200'} target={'_blank'} rel={'noopener noreferrer'}>
                {questName}
            </a>
        </div>
    )
}

export default Objective