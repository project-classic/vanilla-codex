import {useContext, useEffect} from 'react'

import {Context} from './context'
import {check} from "./utils/storage";
import {buildRoute} from "./utils/routeBuilder";

function Init() {
    const {dispatch} = useContext(Context)

    useEffect(() => {
        check().then(profiles => {
            dispatch({
                type: 'load',
                payload: buildRoute()
            })

            dispatch({
                type: 'set_profiles',
                payload: profiles
            })
        })
    })

    return null
}

export default Init