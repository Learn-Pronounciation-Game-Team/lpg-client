import { useState, useEffect } from 'react'
import url from '../config/url'

const useFetchWords = () => {
  const [data, setData] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${url}/word/easy?wordmax=1`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(true)
      })

    return () => {
      setData(null)
    }
  }, [])

  return {
    data,
    error,
    loading
  }
}

export default useFetchWords