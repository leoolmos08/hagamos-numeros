import React from 'react'
import logoExport from '../../assets/logo-export.png'
import styles from './ResultadosExport.module.css'

const ResultadosExport = ({ settlements }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={logoExport}
          alt="Logo Hagamos Números"
          className={styles.logo}
        />
        <h1 className={styles.title}>
          Resultados de los Gastos
        </h1>
      </div>

      <div className={styles.settlements}>
        {settlements.map((settlement, index) => (
          <div
            key={index}
            className={styles.settlement}
          >
            <div className={styles.content}>
              <span className={styles.description}>
                {settlement.from} debe pagar a {settlement.to}
              </span>
              <span className={styles.amount}>
                {settlement.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultadosExport 