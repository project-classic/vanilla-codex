import React, {useState} from 'react'

import '../../interface/css/guide/panel.css'

import Hearthstone from "./panel/hearthstone";
import Level from "./panel/level";
import Tabs from "./panel/tabs";
import Quests from "./panel/quests";
import QuestLog from "./panel/quest-log";

function Panel() {
    const [local, setLocal] = useState({
        quests: true,
        questLog: false
    });

    function toggle() {
        setLocal({
            quests: !local.quests,
            questLog: !local.questLog
        })
    }

    return (
        <div id={'panel'}>
            <Level/>
            <Hearthstone/>
            <Tabs func={toggle} selected={{quests: local.quests, questLog: local.questLog}}/>
            <Quests visible={local.quests}/>
            <QuestLog visible={local.questLog}/>
        </div>
    )
}

export default Panel