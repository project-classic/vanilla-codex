import React from 'react';

function References() {
    return (
        <>
            <div id={'header'}>References</div>
            <div id="references">
                <div className='container'>
                    <Marker data={['Flightpath', 'green']}/>
                    <Marker data={['Quest Hub', 'blue']}/>
                    <Marker data={['Quest Interaction', 'yellow']}/>
                    <Marker data={['Quest Objective', 'red']}/>
                    <Marker data={['Travel Point', 'purple']}/>
                </div>
                <div className='container'>
                    <Color data={['Return quest', 'green']}/>
                    <Color data={['Pick up quest', 'yellow']}/>
                    <Color data={['Pick up & return quest', 'purple']}/>
                    <Color data={['Complete objective', 'red']}/>
                    <Color data={['Authors note', 'blue']}/>
                </div>
                <div className='container'>
                    <Code data={['Part # of Chain', 'P']}/>
                    <Code data={['Elite Quest', 'E']}/>
                    <Code data={['Dungeon Quest', 'D']}/>
                    <Code data={['Escort Quest', 'F']}/>
                    <Code data={['Random Drop Starter', 'R']}/>
                </div>
            </div>
        </>
    )
}

// COLOR ROW
function Color({data}) {
    return (
        <div className='row' id={data[1]}>
            {data[0]}
        </div>
    )
}

// MARKER ROW
function Marker({data}) {
    return (
        <div className='row' id='brown'
             style={{backgroundImage: `url(${require('../../interface/images/waypoints/' + data[1] + '.png')})`}}>
            {data[0]}
        </div>
    )
}

// CODE ROW
function Code({data}) {
    return (
        <div className='row' id='brown'>
            <div className='split'>
                <div>{data[0]}</div>
                <div>{data[1]}</div>
            </div>
        </div>
    )
}

export default References