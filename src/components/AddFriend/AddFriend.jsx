import React from 'react'
import styles from './AddFriend.module.css'

const AddFriend = ({ newFriend, setNewFriend, addFriend }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={newFriend}
        onChange={(e) => setNewFriend(e.target.value)}
        placeholder="Nombre del amigo"
        className={styles.input}
      />
      <button
        onClick={addFriend}
        className={styles.button}
      >
        Agregar
      </button>
    </div>
  )
}

export default AddFriend 