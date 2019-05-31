import React from 'react';
import { tsPropertySignature } from '@babel/types';

function PreviousNext(props) {
    const [local, setLocal] = useState({
        style: {
            opacity: 0
        }
    })

    useEffect(() => {
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
        <PreviousNext type='previous' func={ props.func } visibility={ props.visibility } /> 
    )
}

function Next(props) {
    return (
        <PreviousNext type='next' func={ props.func } visibility={ props.visibility } />
    )
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}