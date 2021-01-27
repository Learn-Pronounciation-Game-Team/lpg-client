import React from 'react'
import { useHistory } from 'react-router-dom'
import clickSound from '../assets/clickSound.mp3'
import useSound from 'use-sound'

function HowToPlay() {
    const history = useHistory()
    const [playClick] = useSound(clickSound, {volume: 0.15})

    function jumpToMain() {
        playClick()
        history.push('/')
    }

    return (
      <div className="background py-10 text-center">
        <h1 className="text-4xl">How to Play?</h1>
        <ol className="sm:w-1/2 py-10 sm:px-8 list-decimal text-left w-4/6 ml-6 sm:ml-0 sm:text-base text-xs">
          <li className="my-5">Player will be given a set of words in the beginning.</li>
          <li className="my-5">Choose one word from the set of words. (You can choose any words that available from the set of words).</li>
          <li className="my-5">Press and Hold the 'Answer' button and then pronounce the word you've chosen.</li>
          <li className="my-5">If your pronunciation is correct, the words will display exploding animations.</li>
          <li className="my-5">If your pronunciation is incorrect, your health will be decreased as a punishment.</li>
          <li className="my-5">Repeat the steps until all words have been pronunciated correctly.</li>
          <li className="my-5">You're gonna lose when the time's up before you've pronounce all the words correctly.</li>
          <li className="my-5">Be careful in pronouncing the words.</li>
          <h1 className="text-center"> - Good Luck!! - </h1>
        </ol>
        <div className="flex justify-center">
          <button onClick={jumpToMain} className="button">Back</button>
        </div>
      </div>
    )
}

export default HowToPlay;