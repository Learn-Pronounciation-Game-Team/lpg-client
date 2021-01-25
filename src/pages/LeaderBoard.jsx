import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../api/index'

function LeaderBoard() {
    const [ leaderboard, setLeaderboard ] = useState([])
    const [ loading, setLoading ] = useState()
    const history = useHistory()

    useEffect(() => {
      setLoading(true)
      API.fetchLeaderBoard()
        .then((res) => {
          setLeaderboard(res.leaderboard)
          setLoading(false)
        })
    }, [])

    if (loading) {
      return <div>Loading...</div>
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
                    </ul>
                </div>
                {JSON.stringify(leaderboard)} 
            <button onClick={() => history.push('/')}>Back To Home</button>
            </div>
        </>
    )
}

export default LeaderBoard;