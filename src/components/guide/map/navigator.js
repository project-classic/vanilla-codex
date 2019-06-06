import React, {useContext, useEffect, useState} from 'react';

import '../../../interface/css/guide/map.css';
import {Context} from "../../context";

function Navigator(props) {
    const [local, setLocal] = useState({
        style: {
            opacity: 1
        }
    });

    useEffect(() => {
        setLocal({
            style: {
                opacity: props.visibility ? 1 : 0
            }
        })
    }, [props.visibility]);

    return (
        <div id={props.type} style={local.style} onClick={props.func}/>
    )
}

function Previous({visibility}) {
    const {state, dispatch} = useContext(Context);

    // BROWSE TO PREVIOUS BLOCK
    function previous() {
        const currentStep = state.currentStep - 1;

        if (currentStep >= 0) {
            dispatch({
                type: 'updateCurrentStep',
                payload: currentStep
            })
        }
    }

    return (
        <Navigator type={'previous'} func={previous} visibility={visibility}/>
    );
}

function Next({visibility}) {
    const {state, dispatch} = useContext(Context);

    // BROWSE TO NEXT BLOCK
    function next() {
        const currentStep = state.currentStep + 1;

        // IF THERE IS ROOM TO MOVE
        if (currentStep <= state.route.path.length - 1) {
            dispatch({
                type: 'updateCurrentStep',
                payload: currentStep
            })
        }
    }

    return (
        <Navigator type={'next'} func={next} visibility={visibility}/>
    )
}

export {
    Previous,
    Next
}