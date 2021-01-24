import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useWindowDimensions from '../helpers/getCurrentWindow'
import containerMain from '../assets/containerMain.png'

export default function LandingPage() {
    const history = useHistory()
    const [ username, setUsername ] = useState();
    const { height, width } = useWindowDimensions();

    function jumpToGame() {
        history.push('/gameplay')
    }

    function jumpToHowToPlay() {
        history.push('/howtoplay')
    }

    function jumpToLeaderBoard() {
        history.push('/leaderboard')
    }

    function jumpToPreparationPage() {
        history.push('/perparationpage')
    }
    
    return (
        <div style={{ backgroundColor: '#F0C38E', width: width, height: height }}>
            <form onSubmit={jumpToGame}>
                <input type="text" placeholder="Type your name"/>
                <button type="submit"> Play </button>
            </form>
                <button type="submit" onClick={jumpToHowToPlay}> How to play </button>
                <button type="submit"onClick={jumpToLeaderBoard}> Leaderboard </button>
                <button type="submit" onClick={jumpToPreparationPage}> PreparationPage </button>
        </div>
    )
}


