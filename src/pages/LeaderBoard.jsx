import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import API from '../api/index'
import LeaderboardList from '../components/LeaderboardList'
import Loading from '../components/Loading'

function LeaderBoard() {
    const [ englishLeaderboard, setEnglishLeaderboard ] = useState([])
    const [ frenchLeaderboard, setFrenchLeaderboard ] = useState([])
    const [ spanishLeaderboard, setSpanishLeaderboard ] = useState([])
    const [ italianLeaderboard, setItalianLeaderboard ] = useState([])
    const [ loading, setLoading ] = useState()
    const [ showing, setShowing ] = useState('English')
    const [ diff, setDiff ] = useState('Easy')
    const history = useHistory()
    const { state } = useLocation()

    useEffect(() => {
      if (state) {
        setShowing(state.language)
        setDiff(state.difficulty)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      setLoading(true)
      API.fetchLeaderBoard()
        .then((res) => {
          const sorted = res.leaderboard.sort((a, b) => b.score - a.score)
          const toEnglish = sorted.filter(board => board.language === 'English' || !board.language)
          const toFrench = sorted.filter(board => board.language === 'French')
          const toSpanish = sorted.filter(board => board.language === 'Spanish')
          const toItalian = sorted.filter(board => board.language === 'Italian')
          setEnglishLeaderboard(toEnglish)
          setFrenchLeaderboard(toFrench)
          setSpanishLeaderboard(toSpanish)
          setItalianLeaderboard(toItalian)
          setLoading(false)
        })
        .catch((err) => {
          console.log('Internal server error');
        })
    }, [])

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
                <p className="text-center">Congratulations {state.name} clearing {state.difficulty} difficulty in {state.language} Language! Your score is {state.score}!</p>
              }
            </div>
            :
            ''
          }
          <div className="flex justify-around w-full sm:w-10/12 flex-wrap">
            <button className="sm:text-xl text-lg text-center my-3 mx-1 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'English' ? true : false} onClick={() => setShowing('English')}>English</button>
            <button className="sm:text-xl text-lg text-center my-3 mx-1 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'French' ? true : false} onClick={() => setShowing('French')}>French</button>
            <button className="sm:text-xl text-lg text-center my-3 mx-1 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Spanish' ? true : false} onClick={() => setShowing('Spanish')}>Spanish</button>
            <button className="sm:text-xl text-lg text-center my-3 mx-1 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Italian' ? true : false} onClick={() => setShowing('Italian')}>Italian</button>
          </div>
          {
            showing === 'English'
            ?
            <LeaderboardList data={englishLeaderboard} diff={diff}/>
            :
            showing === 'French'
            ?
            <LeaderboardList data={frenchLeaderboard}  diff={diff}/>
            :
            showing === 'Italian'
            ?
            <LeaderboardList data={italianLeaderboard}  diff={diff}/>
            :
            <LeaderboardList data={spanishLeaderboard} diff={diff}/>
          }
          <button onClick={() => history.push('/')} className="button mt-3">Back</button>
        </div>
    )
}

export default LeaderBoard;