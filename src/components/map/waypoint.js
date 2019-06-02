import React, {useContext, useState, useEffect} from 'react'
import Context from '../../context';
import Markers from '../../../../vanilla-questing/src/components/map/markers';

function Waypoint() {
    const state = useContext(Context);

    const [local, setLocal] = useState({
        content: null
    })

    const whitelist = new Set([
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
        const markers = state.data.route[state.current].markers
        const offColor = whitelist.has(state.data.route[state.current].zone);

        setLocal({
            content: markers.map((marker, index) =>
                <React.Fragment key={index}>
                    <Line
                        current={waypoint}
                        next={waypoints[index + 1]}
                        offColor={offColor}
                    />
                    <Marker
                        waypoint={marker}
                        block={index}
                    />
                </React.Fragment>
            )
        })
    }, [state.current, state.data])

    return local.content
}

export default Waypoints;
