import React from 'react'
import './Footer.css'
import ReactGA from 'react-ga4'

function Footer() {
  const handleDonate = () => {
    if (import.meta.env.VITE_GA_TRACKING_ID) {
      ReactGA.event({
        category: 'Support',
        action: 'Clicked Donate Button',
      })
    }
    window.open('https://link.mercadopago.com.ar/hagamosnumeros', '_blank')
  }

  const handleSuggestion = () => {
    if (import.meta.env.VITE_GA_TRACKING_ID) {
      ReactGA.event({
        category: 'Support',
        action: 'Clicked Suggestion Button',
      })
    }
    const email = 'leocba95+hagamosnumeros@gmail.com'
    const subject = 'Sugerencia para Hagamos Numeros'
    const body = 'Hola Leo! Tengo una sugerencia para la app:\n\n'
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  return (
    <div className="footer-container">
      <div className="footer-content">
        <p className="footer-text">¿Te fue útil la app? Ayuda a mantenerla viva</p>
        <button className="footer-btn donate-btn" onClick={handleDonate}>
          Donar
        </button>
        <button className="text-btn" onClick={handleSuggestion}>
          Tengo una sugerencia
        </button>
      </div>
    </div>
  )
}

export default Footer
