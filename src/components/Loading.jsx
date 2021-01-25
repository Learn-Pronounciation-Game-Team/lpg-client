import React from 'react'

import gameLogo from '../assets/gameLogo.png'

function Loading() {
    return (
      <div className="background">
        <img className="sm:w-3/12 w-5/12 h-auto py-6 animate-bounce" src={gameLogo} alt="LPG Icon" />
        <div className="bg-gray-400 sm:w-1/2 w-11/12 mb-10 text-center">
            <span className="text-black text-center">Loading...</span>
        </div>
        <h1 className="sm:text-3xl text-center text-1xl mb-10">Beat LPG with your pronunciation skills!</h1>
      </div>
    )
}

export default Loading