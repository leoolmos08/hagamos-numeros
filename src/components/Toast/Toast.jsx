import React from 'react'

const Toast = ({ message, show }) => {
  if (!show) return null

  return (
    <div className="toast-error">
      {message}
    </div>
  )
}

export default Toast 