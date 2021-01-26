import React, { useEffect, useState } from 'react'
import Diffboard from './Diffboard'

function LeaderboardList ({ data, diff }) {
  const [ easyLeaderboard, setEasyLeaderboard ] = useState([])
  const [ mediumLeaderboard, setMediumLeaderboard ] = useState([])
  const [ hardLeaderboard, setHardLeaderboard ] = useState([])
  const [ showing, setShowing ] = useState('Easy')

  useEffect(() => {
    const toEasy = data.filter(board => board.difficulty === 'Easy')
    const toMedium = data.filter(board => board.difficulty === 'Medium')
    const toHard = data.filter(board => board.difficulty === 'Hard')
    setEasyLeaderboard(toEasy)
    setMediumLeaderboard(toMedium)
    setHardLeaderboard(toHard)
  }, [data])

  useEffect(() => {
    if (diff) {
      setShowing(diff)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full sm:w-10/12 flex flex-col items-center my-3">
        <div className="flex justify-around w-full sm:w-10/12">
          <button className="sm:text-xl text-lg text-center my-3 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Easy' ? true : false} onClick={() => setShowing('Easy')}>Easy</button>
          <button className="sm:text-xl text-lg text-center my-3 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Medium' ? true : false} onClick={() => setShowing('Medium')}>Medium</button>
          <button className="sm:text-xl text-lg text-center my-3 cursor-pointer disabled:opacity-100 opacity-30" disabled={showing === 'Hard' ? true : false} onClick={() => setShowing('Hard')}>Hard</button>
        </div>
        {
          showing === 'Easy'
          ?
          <Diffboard data={easyLeaderboard} />
          :
          showing === 'Medium'
          ?
          <Diffboard data={mediumLeaderboard} />
          :
          <Diffboard data={hardLeaderboard} />
        }
    </div>
  )
}

export default LeaderboardList