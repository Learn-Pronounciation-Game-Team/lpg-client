import React from 'react'
import { useHistory } from 'react-router-dom'

function LeaderBoard() {
    const history = useHistory()

    function jumpToLandingPage(name) {
        history.push(`/landingpage`)
    }

    return (
        <>
            <div className="container">
                <h1> LeaderBoard </h1>

                <div>
                    <ul>
                        <li> Rank </li>
                        <li> Player Name </li>
                        <li> Score </li>
                        <li> Difficulty </li>
                        <li> Time </li>
                    </ul>
                </div>

                <button></button>
            </div>
        </>
    )
}

export default LeaderBoard;