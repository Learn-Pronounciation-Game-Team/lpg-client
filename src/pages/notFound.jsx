import React from 'react'
import Error from '../components/Error'

export default function NotFound() {
  return (
    <div className="background py-10">
      <Error notFound={true}/>
    </div>
  )
}
