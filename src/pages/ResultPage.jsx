import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import useSound from 'use-sound'
import clickSound from '../assets/clickSound.mp3'
import failed from '../assets/failed.mp3'
import laugh from '../assets/LPG_-_Laugh.png'
import sad from '../assets/LPG_-_Sad.png'
import congrats from '../assets/congrats.mp3'
import { useAuth } from '../context/auth'

export default function ResultPage() {
  const { setAuthTokens } = useAuth()
  const history = useHistory()
  const { state } = useLocation()
  const [playClick] = useSound(clickSound, {volume: 0.15})
  const [playFailed, {stop: failedStop}] = useSound(failed, {volume: 0.25})
  const [playCongrats, {stop: congratsStop}] = useSound(congrats, {volume: 0.25})

  useEffect(() => {
    if (state.score === 0) {
      playFailed()
      return () => failedStop()
    } else {
      playCongrats()
      return () => congratsStop()
    }
  }, [state.score, playFailed, playCongrats, congratsStop, failedStop])

  function jumpToHome() {
    playClick()
    setTimeout(() => {
      history.replace('/')
      setAuthTokens(false)
    }, 350);
  }

  function jumpToLeaderBoard() {
    playClick()
    setTimeout(() => {
      history.replace('/leaderboard', { name: state.name, score: state.score, difficulty: state.difficulty, language: state.language })
      setAuthTokens(false)
    }, 350);
  }

  return (
    <div className="background py-10">
      <h3 className="sm:text-3xl text-center text-1xl mb-10">{state.score === 0 ? 'SORRY YOU FAILED, HAHAHA!' : 'CONGRATULATIONS!'}</h3>
      <img className=" xl:w-2/12 lg:w-3/12 w-4/12 h-auto py-5" src={state.score === 0 ? laugh : sad} alt="LPG Icon" />
      <h5 className="sm:text-3xl text-center text-1xl mb-10 px-3">{
        state.score === 0
        ?
        `Sorry ${state.name}, you're cannot enlisted into leaderboard`
        :
        `Congratulations ${state.name} clearing ${state.difficulty} difficulty in ${state.language} Language! Your score is ${state.score}!`
      }</h5>
      <div className="flex justify-center flex-wrap">
        <button onClick={jumpToHome} className="order-1 button">Back</button>
        <button onClick={jumpToLeaderBoard} className="order-3 button">Leaderboards</button>
      </div>
    </div>
  )
}


