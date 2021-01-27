import React from 'react'
import { useHistory } from 'react-router-dom'
import clickSound from '../assets/clickSound.mp3'
import useSound from 'use-sound'

function HowToPlay() {
    const history = useHistory()
    const [playClick] = useSound(clickSound, {volume: 0.15})

    function jumpToMain() {
        playClick()
        setTimeout(() => {
          history.push('/')
        }, 200);
    }

    return (
      <div className="background py-10 text-center">
        <h1 className="text-4xl">How to Play?</h1>
        <ol className="sm:w-1/2 py-10 sm:px-8 list-decimal text-left w-4/6 ml-6 sm:ml-0 sm:text-base text-xs">
          <li className="my-5">Player will be given a set of words in the beginning.</li>
          <li className="my-5">Choose one word from the set of words.</li>
          <li className="my-5">Press and Hold the button and then pronounce the word you've chosen.</li>
          <li className="my-5">If your pronunciation is correct, LPG will explode and you got the point.</li>
          <li className="my-5">If not or you don't know how to pronounce it, at the right you will see set of words. Click it and you will hear the correct pronunciation of the word that you've clicked.</li>
          <li className="my-5">Keep going until all those LPG's are all wiped out.</li>
          <li className="my-5">Pay attention for the time you have. When time's up, the game will also end.</li>
          <li className="my-5">Don't forget to have fun.</li>
          <h1 className="text-center mb-8">  ---  </h1>
          <h1 className="text-center"> - You can do it, blow 'em away!! - </h1>
        </ol>
        <div className="flex justify-center">
          <button onClick={jumpToMain} className="button">Back</button>
        </div>
      </div>
    )
}

export default HowToPlay;