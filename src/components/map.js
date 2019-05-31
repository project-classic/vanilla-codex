import React from 'react';

function Map() {
    return (
        <div>
            <svg id={ 'map' } style={ local.style } onMouseDown={ movement.enable } onMouseUp={ movement.disable } onMouseLeave={ movement.disable } onMouseMove={ movement.moving }>
                <Waypoints />
            </svg>
            

        </div>
        // <div onMouseOver={ prevnext.show } onMouseOut={ prevnext.hide }>
        //     <EventListener
        //     target={ 'window' }
        //     onResize={ change_resolution }
        //     />
        //     <svg
        //     id={ 'map' }
        //     style={ local.style }
        //     onMouseDown={ movement.enable }
        //     onMouseUp={ movement.disable }
        //     onMouseLeave={ movement.disable }
        //     onMouseMove={ movement.moving }
        //     ><Markers /></svg>
        //     <PrevNext
        //     type={ 'prev' }
        //     visibility={ local.prevnext }
        //     func={() => { previous(state, dispatch) }}
        //     />
        //     <PrevNext
        //     type={ 'next' }
        //     visibility={ local.prevnext }
        //     func={() => { next(state, dispatch) }}
        //     />
        // </div>
    );
}

export default Map