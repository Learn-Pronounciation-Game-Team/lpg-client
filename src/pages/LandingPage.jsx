import React from 'react'
import { useHistory } from 'react-router-dom'

//Assets
import gameLogo from '../assets/gameLogo.png'

export default function LandingPage() {
  const history = useHistory()

  function jumpToHowToPlay() {
    history.push('/howtoplay')
  }

  function jumpToLeaderBoard() {
    history.push('/leaderboard')
  }

  function jumpToPreparationPage() {
    history.push('/preparation')
  }

  return (
    <div className="background">
      <h1 className="sm:text-8xl text-5xl"> L P G </h1>
      <img className="sm:w-3/12 w-5/12 h-auto py-6" src={gameLogo} alt="LPG Icon" />
      <h1 className="sm:text-3xl text-center text-1xl mb-10">A Learning Pronunciation Game</h1>
      <div className="flex justify-center flex-wrap">
        <button onClick={jumpToHowToPlay} className="order-1 button">How to Play</button>
        <button onClick={jumpToPreparationPage} className="sm:order-2 button">Start</button>
        <button onClick={jumpToLeaderBoard} className="order-3 button">Leaderboards</button>
      </div>
    </div>
  )
}


