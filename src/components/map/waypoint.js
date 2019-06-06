import React, {useState, useEffect} from 'react'

function Waypoint({waypoint, block}) {
    const [local, setLocal] = useState({
        position: {},
        alignment: null,
        number: null,
        space: null
    })

    useEffect(() => {
        setLocal({
            ...local,
            position: {
                left: waypoint.coords.x + '%',
                top: waypoint.coords.y + '%'
            },
            alignment: (waypoint.align === undefined) ? 'right' : waypoint.align,
            number: require('../../interface/images/numbers/' + (block + 1) + '.png'),
            space: require('../../interface/images/waypoints/space.png'),
        })
    }, [waypoint, block])

    return (
        <foreignObject width={'100%'} height={'100%'}>
            <div className={'waypoint'} style={local.position}>
                <img src={local.number} className={'waypointNumber'} />
            </div>

            {/*<div className={'waypoint'} style={local.position}>*/}
            {/*    <img src={local.space} id={'quest'} alt={''} />*/}
            {/*    <span id={local.alignment}>*/}
            {/*        <img src={local.number} className={'waypointNumber'} alt={''} />*/}
            {/*    </span>*/}
            {/*</div>*/}
        </foreignObject>
    )
}

export default Waypoint