import React from 'react'
import styles from './FriendsList.module.css'

const FriendsList = ({ friends, removeFriend }) => {
  if (friends.length === 0) return null

  return (
    <div className={styles.container}>
      {friends.map((friend) => (
        <div
          key={friend}
          className={styles.friendTag}
        >
          <span>{friend}</span>
          <button
            onClick={() => removeFriend(friend)}
            className={styles.removeButton}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default FriendsList 