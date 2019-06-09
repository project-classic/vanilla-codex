import React, {useState} from 'react'

import '../../interface/css/guide/panel.css'

import Hearthstone from "./panel/hearthstone";
import Level from "./panel/level";
import Tabs from "./panel/tabs";
import Quests from "./panel/quests";

function Panel() {
    const [local, setLocal] = useState({
        objectives: true,
        quests: false
    });

    function toggle() {
        setLocal({
            objectives: !local.objectives,
            quests: !local.quests
        })
    }

    return (
        <div id={'panel'}>
            <Level/>
            <Hearthstone/>
            <Tabs/>
            <Quests/>
        </div>
    )
    // return (
    //     <div id={'panel'}>
    //         <Level/>
    //         <Hearthstone/>
    //         <div id={'status'}>
    //             <Level/>
    //             <Hearthstone/>
    //             <div id={'panel-menu'} className={'split'}>
    //                 <Tab label={'Objectives'} func={toggle} selected={local.objectives}/>
    //                 <Tab label={'Quests'} func={toggle} selected={local.quests}/>
    //             </div>
    //         </div>
    //         <div id={'logs'}>
    //             <div id={'overflow-fix'}>
    //                 <Objectives visible={local.objectives}/>
    //                 <QuestLog visible={local.quests}/>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default Panel