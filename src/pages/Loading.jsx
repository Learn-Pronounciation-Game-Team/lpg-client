import React from 'react'

import gameLogo from '../assets/gameLogo.png'

function Loading() {
    return <div className="flex flex-col items-center justify-center">
        <img className="w-auto h-auto pt-28 pb-20" src={gameLogo} alt="LPG Icon" />
        <div className="bg-gray-400 w-1/2 mb-10 text-center">
            <span className="text-black text-center">Loading...</span>
        </div>
        <h1 className="text-3xl">Beat LPG with your pronunciation skills!</h1>
    </div>
}

export default Loading