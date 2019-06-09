import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../../context";

import '../../../interface/css/guide/panel/hearthstone.css'

function Hearthstone() {
    const {state} = useContext(Context);

    const [local, setLocal] = useState({
        location: null
    });

    useEffect(() => {
        const filtered = state.route.hearthstones.filter(id => id.currentStep < state.currentStep);
        let value = 'none';

        if (filtered.length !== 0) {
            value = filtered[filtered.length - 1].zone
        }

        setLocal({
            location: value
        })
    }, [state.currentStep, state.route]);

    return (
        <div id={'hearthstone'}>
            <div id={'hearthstone-title'} className={'hearthstone-text'}>Hearthstone</div>
            <div id={'hearthstone-location'} className={'hearthstone-text'}>{local.location}</div>
        </div>
    )
}

export default Hearthstone