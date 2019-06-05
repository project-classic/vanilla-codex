import React, {useState, useEffect} from 'react'

function Tab({selected, func, label}) {
    const [local, setLocal] = useState({
        style: null
    })

    useEffect(() => {
        setLocal({
            style: selected ? 'current' : null
        })
    }, [selected])

    return (
        <div id={'objectives'} onClick={func} className={local.style}>
            {label}
        </div>
    )
}

export default Tab