import React from 'react'
import Lines from "./lines";
import Waypoints from "./waypoints";
import Markers from "./markers";
import Legend from "./legend";

function Step() {
    return (
        <React.Fragment>
            <Lines/>
            <foreignObject width={'100%'} height={'100%'}>
                <Markers/>
                <Waypoints/>
                <Legend/>
            </foreignObject>
        </React.Fragment>
    )
}

export default Step