import React from 'react'
import logoExport from '../assets/logo-export.png'

const ResultadosExport = ({ settlements }) => (
  <div style={{
    width: 350,
    padding: '2rem 1.5rem 1.5rem 1.5rem',
    background: '#fff',
    borderRadius: 18,
    fontFamily: 'Arial, sans-serif',
    color: '#222',
    boxShadow: '0 2px 12px 0 rgba(30,41,59,0.08)',
    border: '1.5px solid #e5e7eb',
    position: 'relative',
  }}>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18}}>
      <img src={logoExport} alt="Logo cuentas claras" style={{width: 38, height: 38, borderRadius: 8, background: '#fff'}} />
      <span style={{fontWeight: 700, fontSize: 22, color: '#334155'}}>Resultados</span>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18}}>
      {settlements.length === 0 && (
        <span style={{color: '#64748b', fontSize: 16}}>No hay resultados para mostrar.</span>
      )}
      {settlements.map((settlement, idx) => (
        <div key={idx} style={{
          background: '#f8fafc',
          borderRadius: 12,
          borderLeft: '4px solid #22c55e',
          padding: '0.7rem 1rem',
          color: '#334155',
          fontWeight: 600,
          fontSize: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{color: '#334155'}}>{settlement.from}</span>
          <span style={{fontWeight: 400}}>debe pagar</span>
          <span style={{color: '#16a34a', fontWeight: 700}}>{settlement.amount}</span>
          <span style={{fontWeight: 400}}>a</span>
          <span style={{color: '#334155'}}>{settlement.to}</span>
        </div>
      ))}
    </div>
    <div style={{textAlign: 'center', marginTop: 10, fontSize: 13, color: '#64748b', letterSpacing: 1}}>
      hagamosnumeros.com
    </div>
  </div>
)

export default ResultadosExport 