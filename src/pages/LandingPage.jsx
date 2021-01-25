import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import containerMain from '../assets/containerMain.png'

export default function LandingPage() {
    const history = useHistory()
    const [ name, setName ] = useState("");

    function jumpToGame(diff) {
      let appear = diff === 'Easy' ? 3 : diff === 'Medium' ? 5 : 7
      history.push('/gameplay', { diff, name, appear })
    }

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
      <div className="flex flex-col items-center border">
        <input type="text" name="name" className="border" placeholder="Type your name" onChange={(e) => setName(e.target.value)} value={name}/>
        {
          name === '' || name.trim() === ''
          ?
          ""
          :
          <div>
            <button type="button" onClick={() => jumpToGame('Easy')}>Easy</button>
            <button type="button" onClick={() => jumpToGame('Medium')}>Medium</button>
            <button type="button" onClick={() => jumpToGame('Hard')}>Hard</button>
          </div>
        }
        <button type="button" onClick={jumpToHowToPlay}> How to play </button>
        <button type="button"onClick={jumpToLeaderBoard}> Leaderboard </button>
        <button type="button" onClick={jumpToPreparationPage}> PreparationPage </button>

        {name}
      </div>
    )
}


