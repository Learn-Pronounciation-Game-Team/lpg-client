import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../api/index'
import Loading from './Loading'

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
      return <Loading />
    }
    return (
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-4xl mt-20">Leaderboard</h1>
            <table className="text-center my-10 table-fixed w-3/4">
                <thead>
                    <th>Rank</th>
                    <th>Player Name</th>
                    <th>Score</th>
                    <th>Difficulty</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Scott</td>
                        <td>900</td>
                        <td>Hard</td>
                    </tr>
                </tbody>
            </table>
            {JSON.stringify(leaderboard)} 
        <button onClick={() => history.push('/')} className="outline-yellow rounded-lg py-5 px-5 mx-10" style={{width: '250px'}}>Back</button>
        </div>
    )
}

export default LeaderBoard;