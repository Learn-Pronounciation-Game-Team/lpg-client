import React from 'react'

import gameLogo from '../assets/sleep.gif'

function Error({err}) {
    return (
      <div className="background">
        <img className="lg:w-3/12 w-5/12 h-auto py-6" src={gameLogo} alt="LPG Icon" />
        <h1 className="sm:text-3xl text-center text-1xl mb-10">Sorry there is an error</h1>
      </div>
    )
}

export default Error