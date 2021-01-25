import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useWindowDimensions from '../helpers/getCurrentWindow'

//Assets
import gameLogo from '../assets/gameLogo.png'
import btnNext from '../assets/buttons/btn-next.png'

export default function PreparationPage() {
    const history = useHistory()
    const [username, setUsername] = useState();
    const { height, width } = useWindowDimensions();

    function jumpToGame() {
        history.push('/gameplay')
    }

    return (
        <div className="max-h-screen" style={{ backgroundColor: '#F0C38E', width: width, height: height }}>
            <div className="h-screen flex items-center justify-center">
                <div className="bg-containerMain bg-cover p-24 rounded-3xl shadow-2xl">
                    <img className="mx-4 w-5/12 h-auto" src={gameLogo} />
                    <div className="text-4xl uppercase mb-8 text-white flex items-center justify-center font-press-start2p" >
                        Who Are You
                    </div>
                    <div className="flex items-center justify-center">
                    </div>
                    <div className="flex justify-center flex-row">
                        <img className="mx-4" src={btnNext} onClick={jumpToGame} />
                    </div>
                </div>
            </div>
        </div>
    )
}