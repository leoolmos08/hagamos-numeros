import React from 'react'
import styles from './ResetButton.module.css'

const ResetButton = ({ onReset }) => {
  return (
    <button className={styles.button} onClick={onReset}>
      <span className={styles.icon}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
        </svg>
      </span>
      Reiniciar
    </button>
  )
}

export default ResetButton
