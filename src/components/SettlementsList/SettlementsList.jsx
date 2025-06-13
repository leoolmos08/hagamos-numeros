import React from 'react'

const SettlementsList = ({ settlements }) => {
  return (
    <div className="settlements">
      {settlements.map((settlement, index) => (
        <div
          key={index}
          className="settlement-item"
        >
          <p>
            {settlement.from} debe pagar a {settlement.to}
            <span style={{ color: 'var(--success-color)' }}> {settlement.amount}</span>
          </p>
        </div>
      ))}
    </div>
  )
}

export default SettlementsList 