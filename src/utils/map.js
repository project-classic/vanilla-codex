// BACKGROUND DIMENSIONS
const background = {
    width: 1440,
    height: 960
};

// POSITION BACKGROUND AROUND AVERAGE WAYPOINT
function getCenter({waypoints, resolution}) {

    // FIND DEFAULT CENTERED POSITION
    const position = {
        x: (resolution.width - background.width) / 2,
        y: (resolution.height - background.height) / 2
    };

    // IF THE SELECTOR IS SMALLER THAN THE IMAGE, CENTER AROUND AVG COORD
    if (position.x < 0 || position.y < 0) {

        // SELECTOR CENTER
        const center = {
            width: resolution.width / 2,
            height: resolution.height / 2
        };

        // CONTAINER
        let average = {x: 0, y: 0};

        // ADD ALL THE XY COORDS TOGETHER
        waypoints.forEach(waypoint => {
            average.x += waypoint.coords.x;
            average.y += waypoint.coords.y;
        });

        // DIVIDE BY WAYPOINT COUNT
        average.x /= waypoints.length;
        average.y /= waypoints.length;

        // CONVERT PERCENT POSITION TO PIXELS
        const percent = {
            left: (background.width * (average.x / 100)).toFixed(0),
            top: (background.height * (average.y / 100)).toFixed(0)
        };

        // SUBTRACT THE MAP SELECTOR DIMENSIONS
        const calibrated = {
            x: -(percent.left - center.width),
            y: -(percent.top - center.height)
        };

        // FIND POSITIONAL LIMITS
        const limit = {
            x: -(background.width - resolution.width),
            y: -(background.height - resolution.height)
        };

        // BLOCK MOVEMENT WHEN LIMITS ARE SURPASSED
        if (calibrated.y > 0) {
            calibrated.y = 0;
        }
        if (calibrated.y < limit.y) {
            calibrated.y = limit.y;
        }
        if (calibrated.x > 0) {
            calibrated.x = 0;
        }
        if (calibrated.x < limit.x) {
            calibrated.x = limit.x;
        }

        // MODIFY XY POSITION WHEN NECESSARY
        if (position.x < 0) {
            position.x = calibrated.x;
        }
        if (position.y < 0) {
            position.y = calibrated.y;
        }
    }

    return position;
}

// UPDATE MAP POSITION
function getPosition({event, lastEvent, lastPosition, resolution}) {

    // COMPARE SELECTOR DIMENSIONS
    const dimensions = {
        x: resolution.width - background.width,
        y: resolution.height - background.height
    };

    // IF THE CANVAS IS SMALLER THAN THE IMAGE, ALLOW MOVEMENT
    if (dimensions.x < 0 || dimensions.y < 0) {

        // STARTING MOUSE COORDS
        const starting = {
            x: lastEvent.clientX,
            y: lastEvent.clientY
        };

        // ENDING MOUSE COORDS
        const ending = {
            x: event.clientX,
            y: event.clientY
        };

        // DELTA COORDS
        const delta = {
            x: starting.x - ending.x,
            y: starting.y - ending.y,
        };

        // SUBTRACT DELTA FROM CURRENT POSITION
        const position = {
            x: lastPosition.x - delta.x,
            y: lastPosition.y - delta.y
        };

        // MOVEMENT LIMITATIONS
        const limit = {
            x: -(background.width - resolution.width),
            y: -(background.height - resolution.height)
        };

        // ADJUST POSITIONS THAT SURPASS LIMITS
        if (position.x < limit.x) {
            position.x = limit.x;
        }
        if (position.y < limit.y) {
            position.y = limit.y;
        }
        if (position.x > 0) {
            position.x = lastPosition.x;
        }
        if (position.y > 0) {
            position.y = lastPosition.y;
        }

        // RETURN NEW POSITION
        return position;

        // IF THE CANVAS IS LARGER THAN THE IMAGE, BLOCK MOVEMENT & RETURN OLD POSITION
    } else {
        return lastPosition;
    }
}

// CALCULATE SELECTOR DIMENSIONS
function dimensions() {
    const wrapper = document.getElementById('map-wrapper');

    return {
        width: wrapper.clientWidth,
        height: wrapper.clientHeight
    }
}

export {
    getCenter,
    getPosition,
    dimensions
};