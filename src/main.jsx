import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactGA from 'react-ga4'
import { registerSW } from 'virtual:pwa-register'

const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID

if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID)
  ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Inicio" })
} else {
  console.log("No GA Tracking ID found. Analytics disabled.")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// En iOS el acceso directo queda suspendido en memoria y casi nunca navega,
// así que el navegador no busca un service worker nuevo por su cuenta.
// Lo consultamos al abrir, al volver a primer plano y cada hora; con
// autoUpdate la versión nueva se activa y la app se recarga sola.
const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000

registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return
    const checkForUpdate = () => {
      if (navigator.onLine) registration.update().catch(() => {})
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdate()
    })
    setInterval(checkForUpdate, UPDATE_CHECK_INTERVAL_MS)
  },
})
