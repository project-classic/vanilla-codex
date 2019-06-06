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

    const {state} = useContext(Context);

    const [local, setLocal] = useState({
        waypoint: null,
        content: null
    });

    useEffect(() => {
        setLocal({
            ...local,
            waypoint: state.selectedWaypoint
        })

        buildContent(state.selectedWaypoint)

    }, [state.selectedWaypoint]);

    function getPosition(element) {
        return {
            left: element.coords.x + '%',
            top: element.coords.y + '%'
        }
    }

    function buildContent(waypoint) {
        let content = [];
        let colorIndex = 0;

        waypoint.objectives.forEach(objective => {
            switch (objective.type) {
                case 'accept': {
                    switch (quests[objective.id].start.type) {
                        case 'npc': {
                            units[quests[objective.id].start.id].locations.forEach(location => {
                                //TODO: CHECK IF IN THE SAME ZONE
                                content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                            })
                            colorIndex++
                            break
                        }

                        case 'object': {
                            objects[quests[objective.id].start.id].locations.forEach(location => {
                                //TODO: CHECK THE ZONE
                                content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                            })
                            colorIndex++
                            break
                        }

                        case 'item': {
                            items[quests[objective.id].start.id].npcs.forEach(npc => {
                                units[npc].locations.forEach(location => {
                                    content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                                })
                                colorIndex++
                            })

                            items[quests[objective.id].start.id].objects.forEach(object => {
                                objects[object].locations.forEach(location => {
                                    content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                                })
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
                            units[quests[objective.id].end.id].locations.forEach(location => {
                                content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                            })
                            colorIndex++
                            break
                        }

                        case 'object': {
                            objects[quests[objective.id].end.id].locations.forEach(location => {
                                //TODO: CHECK THE ZONE
                                content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                            })
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
                                units[objective.id].locations.forEach(location => {
                                    content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                                })
                                colorIndex++
                                break
                            }

                            case 'object': {
                                objects[objective.id].locations.forEach(location => {
                                    content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                                })
                                colorIndex++
                                break
                            }

                            case 'item': {
                                items[objective.id].npcs.forEach(npc => {
                                    units[npc].locations.forEach(location => {
                                        content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                                    })
                                    colorIndex++
                                })

                                items[objective.id].objects.forEach(object => {
                                    objects[object].locations.forEach(location => {
                                        content.push(<Circle key={content.length} position={getPosition(location)} color={colors[colorIndex]}/>)
                                    })
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

function Circle({position, color}) {
    const style = {
        top: position.top,
        left: position.left,
        backgroundColor: color
    }

    return (
        <div className={'circle'} style={style}/>
    )
}

export default Markers
