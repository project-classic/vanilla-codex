import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../context";

import EventListener from 'react-event-listener';
import {dimensions, getCenter, getPosition} from "../../utils/map";

import '../../interface/css/guide/map.css';
import {Next, Previous} from "./map/navigator";
import Step from "./map/step";
import Legend from "./map/legend";
import zones from '../../resources/zones'

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
        // event.persist();
        // if (local.movementEnabled) {
        //     const position = getPosition({
        //         event: event,
        //         lastEvent: local.lastEvent,
        //         lastPosition: local.lastPosition,
        //         resolution: local.resolution
        //     });
        //
        //     setLocal({
        //         ...local,
        //         lastEvent: event,
        //         lastPosition: position,
        //         style: {
        //             ...local.style,
        //             left: position.x + 'px',
        //             top: position.y + 'px'
        //         }
        //     })
        // }
    }

    function getCenterFunky(waypoints) {
        let x = 0
        let y = 0
        let waypointNumber = 0
        waypoints.forEach(waypoint => {
            x += (waypoint.coords.x)
            y += (waypoint.coords.y)
            waypointNumber++
        })

        return {
            x: x / waypointNumber,
            y: y / waypointNumber
        }
    }

    //ON INITIAL LOAD
    useEffect(() => {
        updateResolution()
    }, [state.profiles]);

    // CHANGE POSITION
    useEffect(() => {
        const waypoints = state.route.path[state.currentStep].waypoints
        const resolution = dimensions()
        const position = getCenter({waypoints: waypoints, resolution: resolution})

        const newCenter = getCenterFunky(waypoints)
        let smallX = 100
        let bigX = 0
        let smallY = 100
        let bigY = 0
        let scale = 1

        if (state.currentMarkers !== null) {
            state.currentMarkers.forEach(marker => {
                marker.locations.forEach(location => {
                    if (location.coords.x > bigX) {
                        bigX = location.coords.x
                    } else if (location.coords.x < smallX) {
                        smallX = location.coords.x
                    } else if (location.coords.y > bigY) {
                        bigY = location.coords.y
                    } else if (location.coords.y < smallY) {
                        smallY = location.coords.y
                    }
                })
            })

            let xDiff = (bigX - smallX) * 0.01 * 1440
            let yDiff = (bigY - smallY) * 0.01 * 960
            console.log(xDiff, yDiff, bigY, smallY)
            while ((scale * xDiff < 1440) && (scale * yDiff < 960) && scale < 5) {
                scale += 0.25
            }
            scale -= 1
        }
        setLocal({
            ...local,
            lastPosition: position,
            resolution: resolution,
            style: {
                backgroundImage: 'url(' + require('../../interface/images/maps/' + zones[state.route.path[state.currentStep].zone] + '.jpg') + ')',
                transform: 'scale(' + scale + ') translate(' + (50 - newCenter.x) + '%, ' + (50 - newCenter.y) + '%)',
                // left: position.x + 'px',
                // top: position.y + 'px'
            }
        })
    }, [local.resolution, state.route.path, state.currentStep, state.profiles, state.loaded, state.currentMarkers]);

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
            <Legend/>
            <Previous visible={local.showChangeStep}/>
            <Next visible={local.showChangeStep}/>
        </div>
    )
}

export default Map;