import React, { createContext, useReducer } from "react";
// import { update, change } from "./funcs/storage";
import Prompt from './components/prompt';
import {getProfiles} from "./utils/storage";
import {buildRoute} from "./utils/routeBuilder";

// DECLARE CONTEXT
const Context = createContext(undefined);

// CONTEXT REDUCER
function reducer(state, action) {
   console.log('I am in the reducer')
   switch (action.type) {
      case 'updateRouteStep': {
         console.log(action.payload)
         return {
            ...state,
            routeStep: action.payload
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
            loaded: action.payload
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
function Provider({ children }) {
   let profiles = null

   getProfiles().then(loadedProfiles => {
      profiles = loadedProfiles
   })

   const [state, dispatch] = useReducer(reducer, {
      route: buildRoute(),
      routeStep: 0,
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
          <Prompt />
          <div id="wrapper">
             { children }
          </div>
       </Context.Provider>
    )
}

export {
   Context,
   Provider
}