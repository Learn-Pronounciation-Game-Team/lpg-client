import React from 'react'

function LeaderboardList ({ data, diff }) {
  return (
    <div className="w-full sm:w-10/12 flex flex-col items-center my-3">
      <h1 className="sm:text-2xl text-lg text-center my-3">{ diff }</h1>
        <div className="w-full grid grid-cols-3 border-t-2 py-2">
          <p className="leaderboard-list">Rank</p>
          <p className="leaderboard-list">Name</p>
          <p className="leaderboard-list">Score</p>
        </div>
        {
          data.map((list, idx) => (
            <div key={list._id} className="w-full grid grid-cols-3">
              <p className="leaderboard-list">{ idx + 1 }</p>
              <p className="leaderboard-list">{ list.name }</p>
              <p className="leaderboard-list">{ list.score }</p>
            </div>
          ))
        }
    </div>
  )
}

export default LeaderboardList