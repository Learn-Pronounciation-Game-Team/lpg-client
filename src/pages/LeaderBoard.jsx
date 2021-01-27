import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import API from '../api/index'
import LeaderboardList from '../components/LeaderboardList'
import clickSound from '../assets/clickSound.mp3'
import choosingSound from '../assets/choosingSound.mp3'
import useSound from 'use-sound'
import Loading from '../components/Loading'
import Error from '../components/Error'

function LeaderBoard() {
    const [ englishLeaderboard, setEnglishLeaderboard ] = useState([])
    const [ frenchLeaderboard, setFrenchLeaderboard ] = useState([])
    const [ spanishLeaderboard, setSpanishLeaderboard ] = useState([])
    const [ italianLeaderboard, setItalianLeaderboard ] = useState([])
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState()
    const [ showing, setShowing ] = useState('English')
    const [ diff, setDiff ] = useState('Easy')
    const history = useHistory()
    const { state } = useLocation()
    const [playChoosing] = useSound(choosingSound, {volume: 0.15})
    const [playClick] = useSound(clickSound, {volume: 0.15})


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
          setError(err)
          setLoading(false)
        })
    }, [])

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <Error err={error}/>
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
                <p className="text-center container">Sorry {state.name}, you're cannot enlisted into leaderboard</p>
                :
                <p className="text-center container">Congratulations {state.name} clearing {state.difficulty} difficulty in {state.language} Language! Your score is {state.score}!</p>
              }
            </div>
            :
            ''
          }
          <div className="flex justify-around w-full sm:w-10/12 flex-wrap">
            <button className="sm:text-xl text-lg text-center my-3 mx-1 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'English' ? true : false} onClick={() => {playChoosing(); setShowing('English')}}>English</button>
            <button className="sm:text-xl text-lg text-center my-3 mx-1 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'French' ? true : false} onClick={() => {playChoosing(); setShowing('French')}}>French</button>
            <button className="sm:text-xl text-lg text-center my-3 mx-1 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Spanish' ? true : false} onClick={() => {playChoosing(); setShowing('Spanish')}}>Spanish</button>
            <button className="sm:text-xl text-lg text-center my-3 mx-1 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Italian' ? true : false} onClick={() => {playChoosing(); setShowing('Italian')}}>Italian</button>
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
          <button onClick={() => {
            playClick()
            setTimeout(() => {
              history.push('/')  
            }, 200)}} className="button mt-3">Back</button>
        </div>
    )
}

export default LeaderBoard;