import React, {useState, useEffect, useContext} from 'react';

import '../../interface/css/map.scss';
import {Context} from "../../context";

function PreviousNext(props) {
    const [local, setLocal] = useState({
        style: {
            opacity: 1
        }
    })

    useEffect(() => {
        console.log(props.visibility)
        setLocal({
            style: {
                opacity: props.visibility ? 1 : 0
            }
        })
    }, [props.visibility])

    return (
        <div id={ props.type } style={ local.style } onClick={ props.func }/>
    )
}

function Previous({visibility}) {
    const {state, dispatch} = useContext(Context)

    // BROWSE TO PREVIOUS BLOCK
    function previous() {
        const routeStep = state.routeStep - 1

        if (routeStep >= 0) {
            dispatch({
                type: 'updateRouteStep',
                payload: routeStep
            })
        }
    }

    return (
        <PreviousNext type={'previous'} func={previous()} visibility={visibility} />
    );
}

function Next({visibility}) {
    const {state, dispatch} = useContext(Context)

    // BROWSE TO NEXT BLOCK
    function next() {
        const routeStep = state.routeStep + 1;

        // IF THERE IS ROOM TO MOVE
        if (routeStep <= state.route.length - 1) {
            dispatch({
                type: 'updateRouteStep',
                payload: routeStep
            })
        }
    }

    return (
        <PreviousNext type={'next'} func={next()} visibility={visibility} />
    )
}

export {
  Previous,
  Next
}