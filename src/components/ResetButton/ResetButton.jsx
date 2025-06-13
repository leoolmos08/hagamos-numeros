import React from 'react'

const ResetButton = ({ onReset }) => {
  const handleClick = () => {
    if(window.confirm('¿Estás seguro de que quieres reiniciar todo? Se borrarán todos los datos.')) {
      onReset()
    }
  }

  return (
    <button
      style={{
        marginTop: '0.7rem',
        width: '100%',
        background: '#f87171',
        color: 'white',
        borderRadius: '0.7rem',
        fontWeight: 600,
        fontSize: '1rem',
        padding: '0.7rem 0',
        border: 'none'
      }}
      onClick={handleClick}
    >
      Reiniciar todo
    </button>
  )
}

export default ResetButton 