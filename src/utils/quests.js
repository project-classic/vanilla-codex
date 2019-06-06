function getQuestLog(route, currentStep) {
    const container = new Map();

    for (let x = 0; x < currentStep; x++) {
        const waypoints = route.path[x].waypoints;

        waypoints.forEach(waypoint => {
            waypoint.objectives.forEach(objective => {
                if (objective.type === 'complete') {
                    container.delete(objective.quest)
                }

                if (objective.type === 'accept') {
                    container.set(objective.quest, objective.quest)
                }

            })
        })
    }

    return Array.from(container.values())
}

export default getQuestLog