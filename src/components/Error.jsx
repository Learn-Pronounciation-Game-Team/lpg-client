import React from 'react'
import { useHistory } from 'react-router-dom'
import useSound from 'use-sound'
import clickSound from '../assets/clickSound.mp3'

import gameLogo from '../assets/sleep.gif'

function Error({err, notFound}) {
    const history = useHistory()
    const [playClick] = useSound(clickSound, {volume: 0.15})

    function jumpToHome() {
      playClick()
      setTimeout(() => {
        history.push('/')
      }, 200);
    }

    return (
      <div className="background">
        <img className="lg:w-3/12 w-5/12 h-auto py-6" src={gameLogo} alt="LPG Icon" />
        <h1 className="sm:text-3xl text-center text-1xl mb-10 px-3">
          {
            notFound
            ?
            "Error Page Not Found"
            :
            "Sorry there is an error"
          }
        </h1>
        <div className="flex justify-center flex-wrap">
          <button onClick={jumpToHome} className="order-1 button">Back to Home</button>
        </div>
      </div>
    )
}

export default Error