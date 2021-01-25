import React from 'react'
import { useHistory } from 'react-router-dom'

//Assets
import gameLogo from '../assets/gameLogo.png'
import btnHowtoplay from '../assets/buttons/btn-howtoplay.png'
import btnStartgame from '../assets/buttons/btn-startgame.png'
import btnLeaderboard from '../assets/buttons/btn-leaderboard.png'

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
    <div className="max-h-screen">
      <div className="h-screen flex items-center justify-center">
        <div className="bg-containerMain bg-cover p-24 rounded-3xl shadow-2xl">
          <div className="text-4xl uppercase mb-8 text-white flex items-center justify-center font-press-start2p" >
            L P G
          </div>
          <div className="flex items-center justify-center">
            <img className="mx-4 w-5/12 h-auto" src={gameLogo}/>
          </div>
          <div className="text-sm mb-8 text-white flex items-center justify-center font-press-start2p">
            a learning prononciation game.
          </div>
          <div className="flex justify-center flex-row">
            <img className="mx-4" src={btnHowtoplay} onClick={jumpToHowToPlay} />
            <img className="mx-4" src={btnStartgame} onClick={jumpToPreparationPage} />
            <img className="mx-4" src={btnLeaderboard} onClick={jumpToLeaderBoard} />
          </div>
        </div>
      </div>
    </div>
  )
}


