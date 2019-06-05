import React, {useState, useContext} from 'react';

import '../interface/css/panel.scss'

import Tab from "./panel/tab";
import Objectives from "./panel/objectives/objectives";
import QuestLog from "./panel/questLog/questLog";
import Hearthstone from "./panel/status/hearthstone";

function Panel() {
    const [local, setLocal] = useState({
        objectives: true,
        quests: false
    })

    function toggle() {
        setLocal({
            objectives: !local.objectives,
            quests: !local.quests
        })
    }
    return (
        <div id={'panel'}>
            <div id={'status'}>
                <Hearthstone />
                <div id={'panel-menu'} className={'split'}>
                    <Tab label={'Objectives'} func={toggle} selected={local.objectives} />
                    <Tab label={'Quests'} func={toggle} selected={local.quests} />
                </div>
            </div>
            <div id={'logs'}>
                <div id={'overflow-fix'}>
                    <Objectives visible={local.objectives} />
                    <QuestLog visible={local.quests} />
                </div>
            </div>
        </div>
    )
}

export default Panel