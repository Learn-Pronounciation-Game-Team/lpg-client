import React from 'react'
import { useHistory } from 'react-router-dom'

export default function HowToPlay() {
    const history = useHistory()

    return(
        <div className="container">
            <h1> How To Play </h1>
            <button onClick={() => history.push('/')}>Back To Home</button>
        </div>
    )
}