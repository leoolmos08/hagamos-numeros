import React from 'react'

const AddFriend = ({ newFriend, setNewFriend, addFriend }) => (
  <div className="input-group">
    <input
      type="text"
      value={newFriend}
      onChange={(e) => setNewFriend(e.target.value)}
      placeholder="Nombre del amigo"
      onKeyPress={(e) => e.key === 'Enter' && addFriend()}
    />
    <button onClick={addFriend}>Agregar</button>
  </div>
)

export default AddFriend 