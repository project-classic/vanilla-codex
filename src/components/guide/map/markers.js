import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../../context";
import units from "../../../resources/units";
import quests from '../../../resources/quests';
import objects from '../../../resources/objects';
import items from '../../../resources/items'

import '../../../interface/css/guide/map/markers.css'

function Markers() {
    const colors= [
        '#E45E0A',
        '#AE05B7',
        '#0E3D13',
        '#000CF4',
        '#EC8CCE',
        '#D00F0F',
        '#33D087',
        '#2D9EF5',
        '#2D193D',
        '#15EE27',
        '#EAE61F',
        '#560A0A',
        '#515151',
        '#FFFFFF',
        '#000000'
    ]

    const {state, dispatch} = useContext(Context);

    const [local, setLocal] = useState({
        markers: null,
        content: null
    });

    useEffect(() => {
        buildMarkers(state.selectedWaypoint, state.route.path[state.currentStep].zone)
    }, [state.selectedWaypoint]);

    useEffect(() => {
        setLocal({
            ...local,
            content: buildContent(state.currentMarkers)
        })
    }, [state.currentMarkers, state.markersModified])

    function buildMarkers(waypoint, zone) {
        let markers = []
        let markerNames = []
        let colorIndex = 0

        waypoint.objectives.forEach(objective => {
            switch (objective.type) {
                case 'accept': {
                    switch (quests[objective.id].start.type) {
                        case 'npc': {
                            let locations = []
                            units[quests[objective.id].start.id].locations.forEach(location => {
                                if (location.zone.toString() === zone) {
                                    locations.push(location)
                                }
                            })
                            if (!markerNames.includes(units[quests[objective.id].start.id].name)) {
                                markers.push({name: units[quests[objective.id].start.id].name, locations: locations, color: colors[colorIndex], visible: true})
                                markerNames.push(units[quests[objective.id].start.id].name)
                                colorIndex++
                            }
                            break
                        }

                        case 'object': {
                            let locations = []
                            objects[quests[objective.id].start.id].locations.forEach(location => {
                                if (location.zone.toString() === zone) {
                                    locations.push(location)
                                }
                            })
                            if (!markerNames.includes(objects[quests[objective.id].start.id].name)) {
                                markers.push({name: objects[quests[objective.id].start.id].name, locations: locations, color: colors[colorIndex], visible: true})
                                markerNames.push(objects[quests[objective.id].start.id].name)
                                colorIndex++
                            }
                            break
                        }

                        case 'item': {
                            if (items[quests[objective.id].start.id].npcs !== undefined) {
                                items[quests[objective.id].start.id].npcs.forEach(npc => {
                                    let locations = []
                                    units[npc].locations.forEach(location => {
                                        if (location.zone.toString() === zone) {
                                            locations.push(location)
                                        }
                                    })
                                    if (!markerNames.includes(units[npc].name)) {
                                        markers.push({name: units[npc].name, locations: locations, color: colors[colorIndex], visible: true})
                                        markerNames.push(units[npc].name)
                                        colorIndex++
                                    }
                                })
                            }

                            if (items[quests[objective.id].start.id].objects !== undefined) {
                                items[quests[objective.id].start.id].objects.forEach(object => {
                                    let locations = []
                                    objects[object].locations.forEach(location => {
                                        if (location.zone.toString() === zone) {
                                            locations.push(location)
                                        }
                                    })
                                    if (!markerNames.includes(objects[object].name)) {
                                        markers.push({name: objects[object].name, locations: locations, color: colors[colorIndex], visible: true})
                                        markerNames.push(objects[object].name)
                                        colorIndex++
                                    }
                                })
                            }
                            break
                        }
                    }
                    break
                }

                case 'complete': {
                    switch (quests[objective.id].end.type) {
                        case 'npc': {
                            let locations = []
                            units[quests[objective.id].end.id].locations.forEach(location => {
                                if (location.zone.toString() === zone) {
                                    locations.push(location)
                                }
                            })
                            if (!markerNames.includes(units[quests[objective.id].end.id].name)) {
                                markers.push({name: units[quests[objective.id].end.id].name, locations: locations, color: colors[colorIndex], visible: true})
                                markerNames.push(units[quests[objective.id].end.id].name)
                                colorIndex++
                            }
                            break
                        }

                        case 'object': {
                            let locations = []
                            objects[quests[objective.id].end.id].locations.forEach(location => {
                                if (location.zone.toString() === zone) {
                                    locations.push(location)
                                }
                            })
                            if (!markerNames.includes(objects[quests[objective.id].end.id].name)) {
                                markers.push({name: objects[quests[objective.id].end.id].name, locations: locations, color: colors[colorIndex], visible: true})
                                markerNames.push(objects[quests[objective.id].end.id].name)
                                colorIndex++
                            }
                            break
                        }
                    }
                    break
                }

                case 'quest': {
                    quests[objective.id].objectives.forEach(objective => {
                        switch (objective.type) {
                            case 'npc': {
                                let locations = []
                                units[objective.id].locations.forEach(location => {
                                    if (location.zone.toString() === zone) {
                                        locations.push(location)
                                    }
                                })
                                markers.push({name: units[objective.id].name, locations: locations, color: colors[colorIndex], visible: true})
                                markerNames.push(units[objective.id].name)
                                colorIndex++
                                break
                            }

                            case 'object': {
                                let locations = []
                                objects[objective.id].locations.forEach(location => {
                                    if (location.zone.toString() === zone) {
                                        locations.push(location)
                                    }
                                })
                                markers.push({name: objects[objective.id].name, locations: locations, color: colors[colorIndex], visible: true})
                                markerNames.push(objects[objective.id].name)
                                colorIndex++
                                break
                            }

                            case 'item': {
                                if (items[objective.id].npcs !== undefined) {
                                    items[objective.id].npcs.forEach(npc => {
                                        let locations = []
                                        units[npc.toString()].locations.forEach(location => {
                                            if (location.zone.toString() === zone) {
                                                locations.push(location)
                                            }
                                        })
                                        markers.push({name: units[npc.toString()].name, locations: locations, color: colors[colorIndex], visible: true})
                                        markerNames.push(units[npc.toString()].name)
                                        colorIndex++
                                    })
                                }

                                if (items[objective.id].objects !== undefined) {
                                    items[objective.id].objects.forEach(object => {
                                        let locations = []
                                        objects[object].locations.forEach(location => {
                                            if (location.zone.toString() === zone) {
                                                locations.push(location)
                                            }
                                        })
                                        markers.push({name: objects[object].name, locations: locations, color: colors[colorIndex], visible: true})
                                        markerNames.push(objects[object].name)
                                        colorIndex++
                                    })
                                }
                                break
                            }
                        }
                    })
                    break
                }
            }
        });

        setLocal({
            ...local,
            markers: markers
        })

        dispatch({
            type: 'updateMarkers',
            payload: markers
        })
    }

    function buildContent(markers) {
        const content = [];

        if (markers !== null) {
            // Order markers from largest amount of locations to smallest in order to prioritize markers with less locations
            markers.sort(function(markerA, markerB){return markerB.locations.length - markerA.locations.length})

            markers.forEach(marker => {
                marker.locations.forEach(location => {
                    content.push(<Circle key={content.length} position={location} color={marker.color} visible={marker.visible}/>)
                })
            })
        }

        return content
    }

    return (
        <React.Fragment>
            {local.content}
        </React.Fragment>
    )
}

function Circle({position, color, visible}) {
    const [local, setLocal] = useState({
        opacity: visible.toString()
    })

    useEffect(() => {
        setLocal({
            opacity: visible ? "1" : "0"
        })
    }, [visible])

    return (
        <circle cx={position.coords.x + '%'} cy={position.coords.y + '%'} fill={color} opacity={local.opacity} />
    )
    // {/*<div className={'circle'} style={local.style}/>*/}
}

export default Markers
