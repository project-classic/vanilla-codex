import React, {createContext, useReducer} from "react";
// import { update, change } from "./funcs/storage";
import {getProfiles} from "../utils/storage";
import {buildRoute} from "../utils/route-builder";

import '../interface/css/main.css'

// DECLARE CONTEXT
const Context = createContext(undefined);

// CONTEXT REDUCER
function reducer(state, action) {
    switch (action.type) {
        case 'updateCurrentStep': {
            let selectedWaypoint = state.route.path[action.payload].waypoints[0]
            let selectedWaypointIndex = 0

            return {
                ...state,
                currentStep: action.payload,
                selectedWaypoint: selectedWaypoint,
                selectedWaypointIndex: selectedWaypointIndex

            }
        }

        case 'selectWaypoint': {
            return {
                ...state,
                selectedWaypoint: action.payload.selectedWaypoint,
                selectedWaypointIndex: action.payload.selectedWaypointIndex
            }
        }

        case 'nextWaypoint': {
            let newIndex = state.selectedWaypointIndex
            let newWaypoint = state.selectedWaypoint
            let newCurrentStep = state.currentStep
            if (state.selectedWaypointIndex + 1 < state.route.path[state.currentStep].waypoints.length) {
                newIndex = state.selectedWaypointIndex + 1
                newWaypoint = state.route.path[state.currentStep].waypoints[newIndex]
            } else if (state.selectedWaypointIndex + 1 >= state.route.path[state.currentStep].waypoints.length && state.currentStep + 1 < state.route.path.length) {
                newIndex = 0
                newCurrentStep = state.currentStep + 1
                newWaypoint = state.route.path[newCurrentStep].waypoints[newIndex]
            }
            return {
                ...state,
                selectedWaypoint: newWaypoint,
                selectedWaypointIndex: newIndex,
                currentStep: newCurrentStep
            }
        }

        case 'previousWaypoint': {
            let newIndex = state.selectedWaypointIndex
            let newWaypoint = state.selectedWaypoint
            let newCurrentStep = state.currentStep
            if (state.selectedWaypointIndex > 0) {
                newIndex = state.selectedWaypointIndex - 1
                newWaypoint = state.route.path[state.currentStep].waypoints[newIndex]
            } else if (state.currentStep - 1 >= 0) {
                newCurrentStep = state.currentStep - 1
                newIndex = state.route.path[newCurrentStep].waypoints.length - 1
                newWaypoint = state.route.path[newCurrentStep].waypoints[newIndex]
            }
            return {
                ...state,
                selectedWaypoint: newWaypoint,
                selectedWaypointIndex: newIndex,
                currentStep: newCurrentStep
            }
        }

        // LOAD PROFILE
        case 'load': {
            return {
                ...state,
                ...action.payload
            }
        }

        // CURRENT LOADED PROFILE
        case 'loaded': {
            return {
                ...state,
                loaded: !state.loaded
            }
        }

        // FALLBACK
        default: {
            console.log('Reducer Error!');
            return state;
        }
    }
}

// CONTEXT PROVIDER
function Provider({children}) {
    let profiles = null;

    getProfiles().then(loadedProfiles => {
        profiles = loadedProfiles
    });

    const [state, dispatch] = useReducer(reducer, {
        route: buildRoute(),
        currentStep: 0,
        selectedWaypoint: buildRoute().path[0].waypoints[0],
        selectedWaypointIndex: 0,
        profiles: profiles,
        loaded: null,
    });

    return (
        <Context.Provider value={{state, dispatch}}>
            <div id={'container'}>
                {children}
            </div>
        </Context.Provider>
    )
}

export {
    Context,
    Provider
}