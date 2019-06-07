import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../context";

import '../../../interface/css/guide/map/navigator.css';

function Navigator({type, func, visible}) {
    const [local, setLocal] = useState({
        style: {
            opacity: 1
        }
    });

    useEffect(() => {
        setLocal({
            style: {
                opacity: visible ? 1 : 0
            }
        })
    }, [visible]);

    return (
        <div id={type} style={local.style} onClick={func}/>
    )
}

function Previous({visible}) {
    const {state, dispatch} = useContext(Context);

    // BROWSE TO PREVIOUS BLOCK
    function previous() {
        const previousStep = state.currentStep - 1;

        if (previousStep >= 0) {
            dispatch({
                type: 'updateCurrentStep',
                payload: previousStep
            })
        }
    }

    return (
        <Navigator type={'previous'} func={previous} visible={visible}/>
    );
}

function Next({visible}) {
    const {state, dispatch} = useContext(Context);

    // BROWSE TO NEXT BLOCK
    function next() {
        const nextStep = state.currentStep + 1;

        // IF THERE IS ROOM TO MOVE
        if (nextStep <= state.route.path.length - 1) {
            dispatch({
                type: 'updateCurrentStep',
                payload: nextStep
            })
        }
    }

    return (
        <Navigator type={'next'} func={next} visible={visible}/>
    )
}

export {
    Previous,
    Next
}