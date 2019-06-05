import React, {useContext, useEffect} from 'react'


import '../interface/css/prompt.scss'
import {Context} from "../context";
import {sleep} from "../utils/util";
import CreateProfile from "./prompt/createProfile";
import References from "./prompt/references";

function Prompt() {
    const {state, dispatch} = useContext(Context)

    useEffect(() => {
        if (state.prompt.visible) {
            document.getElementById('prompt').style.display = 'flex'
            sleep(100).then(() => {
                document.getElementById('prompt').style.opacity = 1
            })
        } else {
            document.getElementById('prompt').style.opacity = 0
            sleep(100).then(() => {
                document.getElementById('prompt').style.display = 'none'
            })
        }
    }, [state.prompt.visible])

    return (
        <div id={'prompt'}>
            <div id={'inner'}>
                <Content type={state.prompt.type} />
                <span id={'close'} onClick={() => {dispatch({type: 'hide-prompt'})}} />
            </div>
        </div>
    )
}

function Content(type) {
    switch (type) {
        case 'loading': {
            return <div className={'lds-dual-ring'} />
        }

        case 'createProfile': {
            return <CreateProfile />
        }

        case 'references': {
            return <References />
        }

        default: {
            return <div>Prompt type error</div>
        }
    }
}

export default Prompt