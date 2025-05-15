import React from 'react'

const SettlementsList = ({ settlements }) => (
  <div className="settlements">
    {settlements.map((settlement, index) => (
      <div key={index} className="settlement-item">
        <p>
          <span style={{ fontWeight: '600' }}>{settlement.from}</span> debe pagar 
          <span style={{ color: 'var(--success-color)', fontWeight: '600' }}> {settlement.amount}</span> a 
          <span style={{ fontWeight: '600' }}> {settlement.to}</span>
        </p>
      </div>
    ))}
  </div>
)

export default SettlementsList 