import route from '../resources/route.json'
import quests from '../resources/quests.json'

function buildRoute() {
    return {
        quests: quests,
        path: route.path,
        hearthstones: getHearthstones(route.path)
    }
}

function getHearthstones(route) {
    const container = []

    route.forEach((routeStep, index) => {
        routeStep.waypoints.forEach(waypoint => {
            waypoint.objectives.forEach(objective => {
                if (objective.type === 'note' && objective.description.toLowerCase() === 'set hearthstone') {
                    container.push({
                        routeStep: index,
                        zone: routeStep.zone
                    })
                }
            })
        })
    })

    return container
}

export {
    buildRoute
}