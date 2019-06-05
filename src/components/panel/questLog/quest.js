import React from 'react'

function Quest({quest, quests}) {
    function row() {
        return (
            <Single header={quest} quests={quests} />
        )
    }

    return (
        <div className={'quest'}>
            {row}
        </div>
    )
}

function Single({quests, header}) {
    return (
        <div>
            <a href={'https://classicdb.ch/?quest=200'} target={'_blank'} rel={'noopener noreferrer'}>
                {header}
            </a>
        </div>
    )
}

export default Quest