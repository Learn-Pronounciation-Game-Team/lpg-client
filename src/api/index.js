import url from '../config/url'

const fetchWords = (diff) => {
  let lowercased = diff.toLowerCase()
  const promise = new Promise((res, rej) => {
    fetch(`${url}/word/${lowercased}?wordmax=3`)
      .then(res => res.json())
      .then(data => {
        res(data)
      })
      .catch(err => {
        rej(err)
      })
  })
  return promise
}

const fetchLeaderBoard = () => {
  const promise = new Promise((res, rej) => {
    fetch(`${url}/leaderboard`)
      .then(res => res.json())
      .then(data => {
        res(data)
      })
      .catch(err => {
        rej(err)
      })
  })
  return promise
}

const postLeaderBoard = (obj) => {
  console.log(obj);
  const promise = new Promise((res, rej) => {
    fetch(`${url}/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => {
        res(data)
      })
      .catch(err => {
        rej(err)
      })
  })
  return promise
}

const API = {
  postLeaderBoard,
  fetchLeaderBoard,
  fetchWords
}

export default API