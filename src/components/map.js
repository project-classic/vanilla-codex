import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../context";

import EventListener from 'react-event-listener';
import {dimensions, getPosition, getCenter} from "../utils/map";

import '../interface/css/map.scss';

import Markers from './map/markers';
import {Next, Previous} from "./map/routeStepChanger";
import RouteSteps from "./map/routeSteps";

function Map() {
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // MAP STATE
   const [local, setLocal] = useState({
      showChangeStep: false,
      resolution: null,
      style: null,
      movementEnabled: false,
      lastEvent: null,
      lastPosition: null
   })

   function updateResolution() {
      setLocal({
         ...local,
         resolution: dimensions()
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
      event.target.parentElement.style.transition = "none"

      setLocal({
         ...local,
         movementEnabled: true,
         lastEvent: event
      })
   }

   function disableMovement(event) {
      if (local.movementEnabled) {
         event.target.parentElement.style.transition = "0.2s"

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
         })

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

   // ON INITIAL LOAD
   useEffect(() => {
      console.log('also getting triggered')
       updateResolution()
   }, [state.profiles])

   // CHANGE POSITION
   useEffect(() => {
      if (local.resolution !== null) {
         const position = getCenter({
            waypoints: state.route.path[state.routeStep].waypoints,
            resolution: local.resolution
         })

         setLocal({
            ...local,
            lastPosition: position,
            style: {
               backgroundImage: 'url(' + require('../interface/images/maps/' + state.route.path[state.routeStep].zone + '.jpg') + ')',
               // left: '50%',
               // top:  '50%'
               left: position.x + 'px',
               top: position.y + 'px'
            }
         })
      }
   }, [local.resolution, state.route.path, state.routeStep])

   return (
      <div onMouseOver={ enableChangeStep } onMouseOut={ disableChangeStep }>
         <EventListener
            target={ 'window' }
            onResize={ updateResolution }
         />
         <svg
            id={ 'map' }
            style={ local.style }
            onMouseDown={ enableMovement }
            onMouseUp={ disableMovement }
            onMouseLeave={ disableMovement }
            onMouseMove={ updateMapPosition }
         >
         <RouteSteps />
         </svg>
         <Previous visibility={local.showChangeStep} />
         <Next visibility={local.showChangeStep} />
      </div>
)}

export default Map;