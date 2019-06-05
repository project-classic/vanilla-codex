import React, { useContext } from 'react';
import { Context } from "../context";

import '../interface/css/menu.css';

import Main from './menu/main';
import Sub from './menu/sub';
import Profiles from './menu/profiles';

function Menu() {
    const {dispatch} = useContext(Context)

    function createProfile() {
        dispatch({
            type: 'show-prompt',
            payload: 'createProfile'
        })
    }

    function showReferences() {
        dispatch({
            type: 'show-prompt',
            payload: 'references'
        })
    }

    return (
        <div id={'menu'}>
            <div>
                <Main header={'Home'} link={'/'} />
                <Main header={'Help'} >
                    <Sub header={'References'} icon={'references'} func={showReferences} />
                </Main>
            </div>
            <div>
                <Main header={'Load Progress'}>
                    <Profiles />
                </Main>
                <Main header={'New Profile'}>
                    <Sub header={'Some Shit'} icon={'orc'} func={createProfile} />
                </Main>
            </div>
        </div>
    )
}

export default Menu
