import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../../context";
import units from "../../../resources/units";
import quests from '../../../resources/quests';
import objects from '../../../resources/objects';
import items from '../../../resources/items'

import '../../../interface/css/guide/map/markers.css'

function Markers() {
    const colors = ["#1bc63e", "#E94F37", "#1C89BF", "#A1D363",
        "#85FFC7", "#297373", "#FF8552", "#A40E4C"];

    const {state, dispatch} = useContext(Context);

    const [local, setLocal] = useState({
        markers: null,
        content: null
    });

    useEffect(() => {
        buildMarkers(state.selectedWaypoint)
    }, [state.selectedWaypoint]);

    useEffect(() => {
        console.log('MARKERS HAVE CHANGED')
        buildContent(state.currentMarkers)
    }, [state.currentMarkers, state.markersModified])

    function getPosition(element) {
        return {
            left: 'calc(' + element.coords.x + '% - 3px)',
            top: 'calc(' + element.coords.y + '% - 3px)'
        }
    }

    function buildMarkers(waypoint) {
        let markers = []
        let colorIndex = 0

        waypoint.objectives.forEach(objective => {
            switch (objective.type) {
                case 'accept': {
                    switch (quests[objective.id].start.type) {
                        case 'npc': {
                            let locations = []
                            units[quests[objective.id].start.id].locations.forEach(location => {
                                //TODO: CHECK IF IN THE SAME ZONE
                                locations.push(location)
                            })
                            markers.push({locations: locations, color: colors[colorIndex], visible: true})
                            colorIndex++
                            break
                        }

                        case 'object': {
                            let locations = []
                            objects[quests[objective.id].start.id].locations.forEach(location => {
                                //TODO: CHECK THE ZONE
                                locations.push(location)
                            })
                            markers.push({locations: locations, color: colors[colorIndex], visible: true})
                            colorIndex++
                            break
                        }

                        case 'item': {
                            items[quests[objective.id].start.id].npcs.forEach(npc => {
                                let locations = []
                                units[npc].locations.forEach(location => {
                                    locations.push(location)
                                })
                                markers.push({locations: locations, color: colors[colorIndex], visible: true})
                                colorIndex++
                            })

                            items[quests[objective.id].start.id].objects.forEach(object => {
                                let locations = []
                                objects[object].locations.forEach(location => {
                                    locations.push(location)
                                })
                                markers.push({locations: locations, color: colors[colorIndex], visible: true})
                                colorIndex++
                            })
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
                                locations.push(location)
                            })
                            markers.push({locations: locations, color: colors[colorIndex], visible: true})
                            colorIndex++
                            break
                        }

                        case 'object': {
                            let locations = []
                            objects[quests[objective.id].end.id].locations.forEach(location => {
                                //TODO: CHECK THE ZONE
                                locations.push(location)
                            })
                            markers.push({locations: locations, color: colors[colorIndex], visible: true})
                            colorIndex++
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
                                    locations.push(location)
                                })
                                markers.push({locations: locations, color: colors[colorIndex], visible: true})
                                colorIndex++
                                break
                            }

                            case 'object': {
                                let locations = []
                                objects[objective.id].locations.forEach(location => {
                                    locations.push(location)
                                })
                                markers.push({locations: locations, color: colors[colorIndex], visible: true})
                                colorIndex++
                                break
                            }

                            case 'item': {
                                items[objective.id].npcs.forEach(npc => {
                                    let locations = []
                                    units[npc].locations.forEach(location => {
                                        locations.push(location)
                                    })
                                    markers.push({locations: locations, color: colors[colorIndex], visible: true})
                                    colorIndex++
                                })

                                items[objective.id].objects.forEach(object => {
                                    let locations = []
                                    objects[object].locations.forEach(location => {
                                        locations.push(location)
                                    })
                                    markers.push({locations: locations, color: colors[colorIndex], visible: true})
                                    colorIndex++
                                })
                                break
                            }
                        }
                    })
                    break
                }
            }
        });

        dispatch({
            type: 'updateMarkers',
            payload: markers
        })

        setLocal({
            ...local,
            markers: markers
        })

    }

    function buildContent(markers) {
        let content = []


        if (markers !== null) {
            // Order markers from largest amount of locations to smallest in order to prioritize markers with less locations
            markers.sort(function(markerA, markerB){return markerB.locations.length - markerA.locations.length})

            markers.forEach(marker => {
                marker.locations.forEach(location => {
                    content.push(<Circle key={content.length} position={getPosition(location)} color={marker.color} visible={marker.visible}/>)
                })
            })
        }

        setLocal({
            ...local,
            content: content
        })
    }

    return (
        <React.Fragment>
            {local.content}
        </React.Fragment>
    )
}

function Circle({position, color, visible}) {
    const [local, setLocal] = useState({
        style: {
            top: position.top,
            left: position.left,
            backgroundColor: color,
            opacity: 1
        }
    })

    useEffect(() => {
        setLocal({
            style: {
                ...local.style,
                opacity: visible ? 1 : 0
            }
        })
    }, [visible])

    return (
        <div className={'circle'} style={local.style}/>
    )
}

export default Markers
