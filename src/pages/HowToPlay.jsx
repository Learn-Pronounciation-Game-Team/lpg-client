import React from 'react'
import { useHistory } from 'react-router-dom'

function HowToPlay() {
    const history = useHistory()

    function jumpToMain() {
        history.push('/')
    }

    return (
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl mt-20">How to Play?</h1>
        <ol className="w-1/2 py-10 px-8 text-justify" style={{listStyleType:'decimal'}}>
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
        <div className="flex justify-center flex-row">
          <button onClick={jumpToMain} className="outline-yellow rounded-lg py-5 px-5 mx-10" style={{width: '250px'}}>Back</button>
        </div>
      </div>
    )
}

export default HowToPlay;