import React from 'react'
import Lines from "./lines";
import Waypoints from "./waypoints";
import Markers from "./markers";

function Step() {
    return (
        <React.Fragment>
            <Lines/>
            <Markers/>
            <foreignObject width={'100%'} height={'100%'}>
                <Waypoints/>
            </foreignObject>
        </React.Fragment>
    )
}

export default Step