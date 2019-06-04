import React, { createContext, useReducer } from "react";
// import { update, change } from "./funcs/storage";
import Prompt from './components/prompt';

// DECLARE CONTEXT
const Context = createContext();

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {
      case 'next_step': {
         console.log('next step')
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

   // ATTACH THE REDUCER
   const [state, dispatch] = useReducer(reducer, {
      data: null,
      routeStep: 0,
      profiles: null,
      prompt: {
         visible: true,
         type: 'loading'
      },
      loaded: null,
      message: {
         visible: false,
         type: undefined,
         value: undefined
      }
   })

   return (
      <Context.Provider value={{ state, dispatch }}>
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