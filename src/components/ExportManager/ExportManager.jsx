import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import ResultadosExport from '../ResultadosExport/ResultadosExport'

const ExportManager = (settlements) => {
  const [showExport, setShowExport] = useState(false)
  const exportRef = useRef(null)

  const exportarResultadosComoImagen = async () => {
    setShowExport(true)
    await new Promise(res => setTimeout(res, 100))
    if (!exportRef.current) return
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: '#fff',
      scale: 2
    })
    setShowExport(false)
    const link = document.createElement('a')
    link.download = 'resultados-gastos.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const ExportPreview = () => {
    if (!showExport) return null

    return (
      <div style={{position: 'fixed', left: -9999, top: 0, zIndex: -1}}>
        <div ref={exportRef}>
          <ResultadosExport settlements={settlements} />
        </div>
      </div>
    )
  }

  return {
    exportarResultadosComoImagen,
    ExportPreview
  }
}

export default ExportManager 