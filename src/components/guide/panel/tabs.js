import React, {useEffect, useState} from 'react'

import '../../../interface/css/guide/panel/tabs.css'

function Tabs({func, selected}) {
    const [local, setLocal] = useState({
        questsSelected: null,
        questLogSelected: null
    })

    useEffect(() => {
        setLocal({
            questsSelected: selected.quests ? 'current-tab' : null,
            questLogSelected: selected.questLog ? 'current-tab' : null
        })
    }, [selected])

    return (
        <div id={'panel-tabs'}>
            <div className={'tab ' + local.questsSelected} onClick={func}>Quests</div>
            <div className={'tab ' + local.questLogSelected} onClick={func}>Quest Log</div>
        </div>
    )
}

export default Tabs