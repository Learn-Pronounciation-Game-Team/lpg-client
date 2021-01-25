import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

//Assets
import gameLogo from '../assets/gameLogo.png'
import btnNext from '../assets/buttons/btn-next.png'

export default function PreparationPage() {
    const history = useHistory()
    const [ name, setName ] = useState("");

    function jumpToGame(diff) {
      let appear = diff === 'Easy' ? 3 : diff === 'Medium' ? 5 : 7
      history.push('/gameplay', { diff, name, appear })
    }

    return (
        <div className="max-h-screen">
            <div className="h-screen flex items-center justify-center">
                <div className="bg-containerMain bg-cover p-24 rounded-3xl shadow-2xl">
                    <img className="mx-4 w-5/12 h-auto" src={gameLogo} />
                    <div className="text-4xl uppercase mb-8 text-white flex items-center justify-center font-press-start2p" >
                        Who Are You
                    </div>
                    <div className="flex items-center justify-center">
                      <input type="text" name="name" className="border" placeholder="Type your name" onChange={(e) => setName(e.target.value)} value={name}/>
                    </div>
                    <div className="flex justify-center flex-row">
                        <img className="mx-4" src={btnNext} onClick={jumpToGame} />
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
                    </div>
                </div>
            </div>
        </div>
    )
}