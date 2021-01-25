import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

//Assets
import gameLogo from '../assets/gameLogo.png'

export default function PreparationPage() {
    const history = useHistory()
    const [ name, setName ] = useState("")
    const [ diff, setDiff ] = useState("")

    function jumpToGame() {
      let appear = diff === 'Easy' ? 3 : diff === 'Medium' ? 5 : 7
      let timer = diff === 'Easy' ? 20 : diff === 'Medium' ? 17 : 15
      history.push('/gameplay', { diff, name, appear, timer })
    }

    return (
      <div className="flex items-center justify-center flex-col">
        <img className="w-auto h-auto mt-20" src={gameLogo} alt="LPG Icon" />
        <h1 className="text-6xl mb-5">Who are you?</h1>
        <div className="flex flex-row items-center justify-center text-center">
          <form>
            <input type="text" className="text-center my-5 bg-transparent border-0 border-b-2 border-yellow-200 w-full" placeholder="Type your name here..." value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="difficulty" className="mt-5">Difficulty</label>
            <div className="mt-5 flex align-middle justify-center">
              <label htmlFor="easy" className="mr-10">
                <input type="radio" name="difficulty" id="easy" value="Easy" className="bg-transparent border-yellow-200 mr-4" checked={diff === 'Easy'} onChange={(e) => setDiff(e.target.value)}/>
                Easy
              </label>
              <label htmlFor="medium" className="mr-10">
                <input type="radio" name="difficulty" id="medium" value="Medium" className="bg-transparent border-yellow-200 mr-4" checked={diff === 'Medium'} onChange={(e) => setDiff(e.target.value)}/>
                Medium
              </label>
              <label htmlFor="hard" className="mr-10">
                <input type="radio" name="difficulty" id="hard" value="Hard" className="bg-transparent border-yellow-200 mr-4" checked={diff === 'Hard'} onChange={(e) => setDiff(e.target.value)}/>
                Hard
              </label>
            </div>
            <button className="outline-yellow rounded-lg my-10 py-5 px-5 mx-10" style={{width: '250px'}} onClick={() => history.push('/')}>Back</button>
            <button className="outline-yellow rounded-lg my-10 py-5 px-5 mx-10" style={{width: '250px'}}  disabled={name === '' || name.trim() === '' || name.length > 10 ? true : false} onClick={jumpToGame}>Next</button>
          </form>
        </div>
      </div>
    )
}