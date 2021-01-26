import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import API from '../api/index'
import LeaderboardList from '../components/LeaderboardList'
import Loading from '../components/Loading'

function LeaderBoard() {
    const [ easyLeaderboard, setEasyLeaderboard ] = useState([])
    const [ mediumLeaderboard, setMediumLeaderboard ] = useState([])
    const [ hardLeaderboard, setHardLeaderboard ] = useState([])
    const [ loading, setLoading ] = useState()
    const [ showing, setShowing ] = useState('Easy')
    const history = useHistory()
    const { state } = useLocation()

    useEffect(() => {
      if (state) {
        setShowing(state.difficulty)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    // return <Loading />
    if (loading) {
      return <Loading />
    }
    return (
        <div className="background py-10 justify-start">
          <h1 className="sm:text-4xl text-2xl text-center mb-3">Leaderboard</h1>
          {
            state
            ?
            <div>
              {
                state.score === 0
                ?
                <p className="text-center">Sorry {state.name}, you're cannot enlisted into leaderboard</p>
                :
                <p className="text-center">Congratulations {state.name} clearing {state.difficulty} difficulty! Your score is {state.score}!</p>
              }
            </div>
            :
            ''
          }
          <div className="flex justify-around w-full sm:w-10/12">
            <button className="sm:text-2xl text-lg text-center my-3 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Easy' ? true : false} onClick={() => setShowing('Easy')}>Easy</button>
            <button className="sm:text-2xl text-lg text-center my-3 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Medium' ? true : false} onClick={() => setShowing('Medium')}>Medium</button>
            <button className="sm:text-2xl text-lg text-center my-3 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Hard' ? true : false} onClick={() => setShowing('Hard')}>Hard</button>
          </div>
          {
            showing === 'Easy'
            ?
            <LeaderboardList data={easyLeaderboard} diff="Easy" />
            :
            showing === 'Medium'
            ?
            <LeaderboardList data={mediumLeaderboard} diff="Medium" />
            :
            <LeaderboardList data={hardLeaderboard} diff="Hard" />
          }
          <button onClick={() => history.push('/')} className="button mt-3">Back</button>
        </div>
    )
}

export default LeaderBoard;