import { useRouter } from 'next/router'
import React from 'react'

const RoomPage = () => {
  const router = useRouter()
  const {room} = router.query
  return (
    <div>{room}</div>
  )
}

export default RoomPage