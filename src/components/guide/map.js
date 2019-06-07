import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../context";

import EventListener from 'react-event-listener';
import {dimensions, getCenter, getPosition} from "../../utils/map";

import '../../interface/css/guide/map.css';
import {Next, Previous} from "./map/navigator";
import Step from "./map/step";

function Map() {
    // GLOBAL STATE
    const {state, dispatch} = useContext(Context);

    // MAP STATE
    const [local, setLocal] = useState({
        showChangeStep: false,
        resolution: null,
        style: null,
        movementEnabled: false,
        lastEvent: null,
        lastPosition: null
    });

    function updateResolution() {
        setLocal({
            ...local,
            resolution: dimensions()
        });

        dispatch({
            type: 'loaded',
            payload: true
        })
    }

    function enableChangeStep() {
        setLocal({
            ...local,
            showChangeStep: true
        })
    }

    function disableChangeStep() {
        setLocal({
            ...local,
            showChangeStep: false
        })
    }

    function enableMovement(event) {
        event.target.parentElement.style.transition = "none";

        setLocal({
            ...local,
            movementEnabled: true,
            lastEvent: event
        })
    }

    function disableMovement(event) {
        if (local.movementEnabled) {
            event.target.parentElement.style.transition = "0.2s";

            setLocal({
                ...local,
                movementEnabled: false
            })
        }
    }

    function updateMapPosition(event) {
        event.persist();
        if (local.movementEnabled) {
            const position = getPosition({
                event: event,
                lastEvent: local.lastEvent,
                lastPosition: local.lastPosition,
                resolution: local.resolution
            });

            setLocal({
                ...local,
                lastEvent: event,
                lastPosition: position,
                style: {
                    ...local.style,
                    left: position.x + 'px',
                    top: position.y + 'px'
                }
            })
        }
    }

    //ON INITIAL LOAD
    useEffect(() => {
        updateResolution()
    }, [state.profiles]);

    // CHANGE POSITION
    useEffect(() => {
        const position = getCenter({
            waypoints: state.route.path[state.currentStep].waypoints,
            resolution: dimensions()
        });

        setLocal({
            ...local,
            lastPosition: position,
            style: {
                backgroundImage: 'url(' + require('../../interface/images/maps/' + state.route.path[state.currentStep].zone + '.jpg') + ')',
                left: position.x + 'px',
                top: position.y + 'px'
            }
        })
    }, [local.resolution, state.route.path, state.currentStep, state.profiles]);

    return (
        <div id={'map-wrapper'} onMouseOver={enableChangeStep} onMouseOut={disableChangeStep}>
            <EventListener
                target={'window'}
                onResize={updateResolution}
            />
            <svg
                id={'map'}
                style={local.style}
                onMouseDown={enableMovement}
                onMouseUp={disableMovement}
                onMouseLeave={disableMovement}
                onMouseMove={updateMapPosition}
            >
                <Step/>
            </svg>
            <Previous visible={local.showChangeStep}/>
            <Next visible={local.showChangeStep}/>
        </div>
    )
}

export default Map;