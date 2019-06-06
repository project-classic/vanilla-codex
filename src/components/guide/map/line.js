import React from 'react'

function Line({currentWaypoint, nextWaypoint, offColor}) {
    if (nextWaypoint !== undefined) {
        return (
            <line
                id={offColor ? 'line-blue' : null}
                x1={currentWaypoint.coords.x + '%'}
                y1={currentWaypoint.coords.y + '%'}
                x2={nextWaypoint.coords.x + '%'}
                y2={nextWaypoint.coords.y + '%'}
            />
        );
    } else {
        return null;
    }
}

export default Line