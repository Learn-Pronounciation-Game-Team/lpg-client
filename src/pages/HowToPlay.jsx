import React from 'react'
import { useHistory } from 'react-router-dom'

//Assets
import gameLogo from '../assets/gameLogo.png'
import btnBack from '../assets/buttons/btn-back.png'

function HowToPlay() {
    const history = useHistory()

    function jumpToMain() {
        history.push('/')
    }

    return (
      <div className="max-h-screen">
        <div className="h-screen flex items-center justify-center">
          <div className="bg-containerMain bg-cover p-24 rounded-3xl shadow-2xl">
            <div className="text-4xl uppercase mb-8 text-white flex items-center justify-center font-press-start2p" >
              <p>How To Play</p>
            </div>
            <div className="flex items-center justify-center">
                <img className="mx-4 w-5/12 h-auto" src={gameLogo} />
            </div>
            <div className="text-sm mb-8 text-white flex items-center justify-center font-press-start2p">
              <p>a learning prononciation game.</p>
            </div>
            <div className="flex justify-center flex-row">
                <img className="mx-4" src={btnBack} onClick={jumpToMain} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default HowToPlay;