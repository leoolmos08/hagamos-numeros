import React from 'react'

const ExportButton = ({ onClick }) => {
  return (
    <button 
      style={{
        marginTop: '1.2rem',
        width: '100%',
        background: 'var(--primary-color)',
        color: 'white',
        borderRadius: '0.7rem',
        fontWeight: 600,
        fontSize: '1rem',
        padding: '0.7rem 0'
      }}
      onClick={onClick}
    >
      Exportar como PNG
    </button>
  )
}

export default ExportButton 