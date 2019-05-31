import React from 'react'

function Line({ currentMarker, nextMarker, offColor}) {
    if (next !== undefined) {
        return (
            <line
                id= { offColor ? 'line-blue': null }
                x1={ currentMarker.coords.x + '%' }
                y1={ currentMarker.coords.y + '%' }
                x2={ nextMarker.coords.x + '%' }
                y2={ nextMarker.coords.y + '%' }
            />
        );
    } else {
        return null;
    }
}

export default Line