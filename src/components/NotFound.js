import React, { useEffect } from 'react'

function NotFound() {
  useEffect(() => {
    document.title = `Not Found `;
  }, [])
  return (
    <p className="h-96 flex justify-center items-center font-bold text-xl text-red-700">
      Page Not Found
    </p>
  )
}

export default NotFound