import React from 'react'

import gameLogo from '../assets/gameLogo.png'

function Error(props) {
    const { errName } = props
    return (
      <div className="background">
        <img className="lg:w-3/12 w-5/12 h-auto py-6 animate-bounce" src={gameLogo} alt="LPG Icon" />
        <div className="bg-gray-400 sm:w-1/2 w-11/12 mb-10 text-center ring-4 ring-red-400 rounded-lg">
          <span className="text-center" style={{color: '#DC143C'}}>Error Status ...{errName}</span>
        </div>
        <h1 className="sm:text-3xl text-center text-1xl mb-10">sory, your request is error</h1>
      </div>
    )
}

export default Error