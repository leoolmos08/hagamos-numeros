import React, { useState, useEffect } from 'react'
import AddFriend from '../AddFriend/AddFriend'
import FriendsList from '../FriendsList/FriendsList'

const FriendsManager = () => {
  const [friends, setFriends] = useState(() => {
    const stored = localStorage.getItem('friends')
    return stored ? JSON.parse(stored) : []
  })
  const [newFriend, setNewFriend] = useState('')

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends))
  }, [friends])

  const addFriend = () => {
    if (newFriend && !friends.includes(newFriend)) {
      setFriends([...friends, newFriend])
      setNewFriend('')
    }
  }

  const removeFriend = (friendToRemove) => {
    setFriends(friends.filter(friend => friend !== friendToRemove))
  }

  return {
    friends,
    addFriend,
    removeFriend,
    newFriend,
    setNewFriend
  }
}

export default FriendsManager 