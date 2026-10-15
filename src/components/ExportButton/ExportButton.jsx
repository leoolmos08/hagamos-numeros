import React from 'react'
import styles from './ExportButton.module.css'

const ExportButton = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Copiar para WhatsApp
    </button>
  )
}

export default ExportButton 