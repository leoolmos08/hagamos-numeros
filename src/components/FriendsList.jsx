import React from 'react'

const FriendsList = ({ friends, removeFriend }) => (
  <div className="friends-list">
    {friends.map(friend => (
      <div key={friend} className="friend-tag">
        {friend}
        <button 
          onClick={() => removeFriend(friend)}
          style={{ 
            background: 'none', 
            padding: '0', 
            color: 'var(--text-secondary)',
            fontSize: '1.2rem'
          }}
        >
          ×
        </button>
      </div>
    ))}
  </div>
)

export default FriendsList 