import React, {useContext, useState, useEffect} from 'react'
import Context from '../../context'

function RouteStep() {
    const state = useContext(Context)

    const [content, setContent] = useState(null)

    const blueLineZones = new Set([
        'barrens',
        'stonetalon',
        'orgrimmar',
        'azshara',
        'badlands',
        'blasted',
        'darnassus',
        'durotar',
        'ironforge',
        'needles',
        'redridge',
        'stormwind',
        'tanaris',
        'westfall', 
    ])

    useEffect(() => {
        const waypoints = state.data.route[state.current].waypoints
    })

}