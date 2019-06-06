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
    const container = [];

    route.forEach((currentStep, index) => {
        currentStep.waypoints.forEach(waypoint => {
            waypoint.objectives.forEach(objective => {
                if (objective.type === 'note' && objective.description.toLowerCase() === 'set hearthstone') {
                    container.push({
                        currentStep: index,
                        zone: currentStep.zone
                    })
                }
            })
        })
    });

    return container
}

export {
    buildRoute
}