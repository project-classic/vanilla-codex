import React from 'react';
import {Previous, Next} from './map/previous_next'

function Map() {
    // style: {
    //     backgroundImage: 'url(' + require('../interface/images/maps/' + state.data.route[state.current].zone + '.jpg') + ')',
    //     left: position.x + 'px',
    //     top: position.y + 'px',
    //  }
    return (
        <div>
            {/* <svg id={ 'map' } style={ local.style } onMouseDown={ movement.enable } onMouseUp={ movement.disable } onMouseLeave={ movement.disable } onMouseMove={ movement.moving }> */}
            <svg id={ 'map' } style={{backgroundImage: 'url(' + require('../interface/images/maps/barrens.jpg') + ')'}}>
                <Previous visibility={ true } />
                <Next visibility={ true }/>
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