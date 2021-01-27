import React from 'react'
import { useHistory } from 'react-router-dom'
import clickSound from '../assets/clickSound.mp3'
import useSound from 'use-sound'

function AboutUs() {
    const history = useHistory()
    const [playClick] = useSound(clickSound, {volume: 0.15})

    function jumpToMain() {
        playClick()
        setTimeout(() => {
          history.push('/')
        }, 200);
    }

    return (
      <div className="background py-10 text-center px-3">
        <h1 className="text-4xl">About Us</h1>
        <p className="text-xs px-3 text-center my-3 sm:w-7/12 w-10/12">LPG ( Learn Pronounciation Game ) is our Final Project in 3rd Phase as a Student at Hacktiv8. This game give you a unique experience in learning pronunciation in foreign languages. Here you can race against time to get best scores. The game offer various difficulty for you to tackle it and be better in pronunciation.</p>
        <h3 className="text-lg py-2">-- Our Team --</h3>
        <a className="text-xs py-1 hover:text-yellow-400" target="_blank" rel="noreferrer" href="https://github.com/jarooda">Jalu Wibowo Aji</a>
        <a className="text-xs py-1 hover:text-yellow-400" target="_blank" rel="noreferrer" href="https://github.com/FaishalFadhil">Achmad Faishal Fadhil</a>
        <a className="text-xs py-1 hover:text-yellow-400" target="_blank" rel="noreferrer" href="https://github.com/normndakbr">Normandia Akbar</a>
        <a className="text-xs py-1 hover:text-yellow-400" target="_blank" rel="noreferrer" href="https://github.com/prasetyarinaldii">Prasetya Rinaldi</a>
        <a className="text-xs py-1 hover:text-yellow-400" target="_blank" rel="noreferrer" href="https://github.com/iridwant">Iftikar Tsani</a>
        <div className="flex justify-center py-3">
          <button onClick={jumpToMain} className="button">Back</button>
        </div>
      </div>
    )
}

export default AboutUs;