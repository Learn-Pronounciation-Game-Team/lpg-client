import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

//Assets
import gameLogo from '../assets/gameLogo.png'

export default function PreparationPage() {
    const history = useHistory()
    const [ name, setName ] = useState("");

    function jumpToGame(diff) {
      let appear = diff === 'Easy' ? 3 : diff === 'Medium' ? 5 : 7
      history.push('/gameplay', { diff, name, appear })
    }

    return (
      <div className="flex items-center justify-center flex-col">
        <img className="w-auto h-auto mt-20" src={gameLogo} alt="LPG Icon" />
        <h1 className="text-6xl mb-5">Who are you?</h1>
        <div className="flex flex-row items-center justify-center text-center">
          <form>
            <input type="text" className="text-center my-5 bg-transparent border-0 border-b-2 border-yellow-200 w-full" placeholder="Type your name here..." /><br/>
            <label htmlFor="difficulty" className="mt-5">Difficulty</label>
            {/* <select id="difficulty" className="w-full bg-transparent text-center mt-5">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select> <br/> */}
            <div className="mt-5">
              <input type="radio" name="difficulty" id="easy" value="Easy" className="bg-transparent border-yellow-200 mr-4" />
              <label htmlFor="easy" className="mr-10">Easy</label>
              <input type="radio" name="difficulty" id="medium" value="Medium" className="bg-transparent border-yellow-200 mr-4" />
              <label htmlFor="medium" className="mr-10">Medium</label>
              <input type="radio" name="difficulty" id="hard" value="Hard" className="bg-transparent border-yellow-200 mr-4" />
              <label htmlFor="hard" className="mr-10">Hard</label>
            </div>
            <button className="outline-yellow rounded-lg my-10 py-5 px-5 mx-10" style={{width: '250px'}} onClick={() => history.push('/')}>Back</button>
            <button className="outline-yellow rounded-lg my-10 py-5 px-5 mx-10" style={{width: '250px'}} type="submit">Next</button>
          </form>
        </div>
      </div>
    )
}