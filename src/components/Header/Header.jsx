import React from 'react'
import mainLogo from '../../assets/mainLogo.png'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <img
        src={mainLogo}
        alt="SplitWeb Logo"
        className={styles.logo}
      />
    </div>
  )
}

export default Header 