import React from 'react'
import { useHistory } from 'react-router-dom'
import useSound from 'use-sound'
import clickSound from '../assets/clickSound.mp3'

//Assets
import gameLogo from '../assets/gameLogo.png'

export default function LandingPage() {
  const history = useHistory()
  const [playClick] = useSound(clickSound, {volume: 0.15})

  function jumpToHowToPlay() {
    playClick()
    setTimeout(() => {
      history.push('/howtoplay')
    }, 200);
  }

  function jumpToLeaderBoard() {
    playClick()
    setTimeout(() => {
      history.push('/leaderboard')
    }, 200);
  }

  function jumpToPreparationPage() {
    playClick()
    setTimeout(() => {
      history.push('/preparation', {game:true})
    }, 200);
  }

  return (
    <div className="background py-10">
      <h1 className="sm:text-8xl text-5xl"> L P G </h1>
      <img className=" xl:w-3/12 lg:w-6/12 w-6/12 h-auto py-6" src={gameLogo} alt="LPG Icon" />
      <h1 className="sm:text-3xl text-center text-1xl mb-10">A Learning Pronunciation Game</h1>
      <div className="flex justify-center flex-wrap">
        <button onClick={jumpToHowToPlay} className="order-1 button">How to Play</button>
        <button onClick={jumpToPreparationPage} className="sm:order-2 button">Start</button>
        <button onClick={jumpToLeaderBoard} className="order-3 button">Leaderboards</button>
      </div>
    </div>
  )
}


