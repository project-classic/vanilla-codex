import React, {useState, useEffect} from 'react';

import '../../interface/css/map.scss';

function PreviousNext(props) {
    const [local, setLocal] = useState({
        style: {
            opacity: 1
        }
    })

    useEffect(() => {
        console.log(props.visibility)
        setLocal({
            style: {
                opacity: props.visibility ? 1 : 0
            }
        })
    }, [props.visibility])

    return (
        <div id={ props.type } style={ local.style } onClick={ props.func }/>
    )
}

function Previous(props) {
    return (
        <PreviousNext type={'previous'} func={ props.func } visibility={ props.visibility } /> 
    );
}

function Next(props) {
    return (
        <PreviousNext type={'next'} func={ props.func } visibility={ props.visibility } />
    );
}

export {
  Previous,
  Next
}