import React from 'react'

function Error({error}) {
  return (
    <p className="h-96 flex justify-center items-center font-bold text-lg text-red-700">
      {error}
    </p>
  )
}

export default Error