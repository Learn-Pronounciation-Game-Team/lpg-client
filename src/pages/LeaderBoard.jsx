import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../api/index'
import LeaderboardList from '../components/LeaderboardList'
import Loading from '../components/Loading'

function LeaderBoard() {
    const [ easyLeaderboard, setEasyLeaderboard ] = useState([])
    const [ mediumLeaderboard, setMediumLeaderboard ] = useState([])
    const [ hardLeaderboard, setHardLeaderboard ] = useState([])
    const [ loading, setLoading ] = useState()
    const history = useHistory()

    useEffect(() => {
      setLoading(true)
      API.fetchLeaderBoard()
        .then((res) => {
          const sorted = res.leaderboard.sort((a, b) => b.score - a.score)
          const toEasy = sorted.filter(board => board.difficulty === 'Easy')
          const toMedium = sorted.filter(board => board.difficulty === 'Medium')
          const toHard = sorted.filter(board => board.difficulty === 'Hard')
          setEasyLeaderboard(toEasy)
          setMediumLeaderboard(toMedium)
          setHardLeaderboard(toHard)
          setLoading(false)
        })
    }, [])

    if (loading) {
      return <Loading />
    }
    return (
        <div className="background py-10">
          <h1 className="sm:text-4xl text-2xl text-center mb-3">Leaderboard</h1>
          <LeaderboardList data={easyLeaderboard} diff="Easy" />
          <LeaderboardList data={mediumLeaderboard} diff="Medium" />
          <LeaderboardList data={hardLeaderboard} diff="Hard" />
          <button onClick={() => history.push('/')} className="button mt-3">Back</button>
        </div>
    )
}

export default LeaderBoard;