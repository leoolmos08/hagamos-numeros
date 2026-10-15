import React from 'react'

const Toast = ({ message, show, type = 'error' }) => {
  if (!show) return null

  return (
    <div className={type === 'success' ? 'toast-error toast-success' : 'toast-error'}>
      {message}
    </div>
  )
}

export default Toast 