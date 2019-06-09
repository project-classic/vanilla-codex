import React, {createContext, useReducer} from "react";
// import { update, change } from "./funcs/storage";
import Prompt from './prompt';
import {getProfiles} from "../utils/storage";
import {buildRoute} from "../utils/route-builder";

import '../interface/css/main.css'

// DECLARE CONTEXT
const Context = createContext(undefined);

// CONTEXT REDUCER
function reducer(state, action) {
    switch (action.type) {
        case 'updateCurrentStep': {
            return {
                ...state,
                currentStep: action.payload
            }
        }

        case 'selectWaypoint': {
            return {
                ...state,
                selectedWaypoint: action.payload
            }
        }

        case 'updateMarkers': {
            return {
                ...state,
                currentMarkers: action.payload
            }
        }

        case 'toggleMarker': {
            return {
                ...state,
                markersModified: !state.markersModified
            }
        }

        // LOAD PROFILE
        case 'load': {
            return {
                ...state,
                ...action.payload
            }
        }

        // SHOW PROMPT WITH APPROPARIATE CONTENT
        case 'show-prompt': {
            return {
                ...state,
                prompt: {
                    visible: true,
                    type: action.payload
                }
            }
        }

        // HIDE PROMPT
        case 'hide-prompt': {
            return {
                ...state,
                prompt: {
                    ...state.prompt,
                    visible: false
                }
            }
        }

        // CURRENT LOADED PROFILE
        case 'loaded': {
            return {
                ...state,
                loaded: !state.loaded
            }
        }

        // SHOW MESSAGE
        case 'show-message': {
            return {
                ...state,
                message: {
                    visible: true,
                    type: action.payload.type,
                    value: action.payload.value
                }
            }
        }

        // HIDE MESSAGE
        case 'hide-message': {
            return {
                ...state,
                message: {
                    visible: false,
                    type: undefined,
                    value: undefined
                }
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
        currentMarkers: null,
        markersModified: false,
        profiles: profiles,
        prompt: {
            visible: false,
            type: 'loading'
        },
        loaded: null,
        message: {
            visible: false,
            type: undefined,
            value: undefined
        }
    });

    return (
        <Context.Provider value={{state, dispatch}}>
            <Prompt/>
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