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
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-8xl mt-24"> L P G </h1>
      <img className="w-auto h-auto py-6" src={gameLogo} alt="LPG Icon" />
      <h1 className="text-3xl mb-10">a learning pronunciation game</h1>
      <div className="flex justify-center flex-row">
        <button onClick={jumpToHowToPlay} className="outline-yellow rounded-lg py-5 px-5 mx-10" style={{width: '250px'}}>How to Play</button>
        <button onClick={jumpToPreparationPage} className="outline-yellow rounded-lg py-5 px-5 mx-10" style={{width: '250px'}}>Start</button>
        <button onClick={jumpToLeaderBoard} className="outline-yellow rounded-lg py-5 px-5 mx-10" style={{width: '250px'}}>Leaderboards</button>
      </div>
    </div>
  )
}


