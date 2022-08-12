import { useRouter } from 'next/router'
import React from 'react'
import Loading from '../../components/Loading'
import MessegeComponent from '../../components/Message'
import { trpc } from '../../utils/trpc'

const RoomPage = () => {
  const router = useRouter()
  const {roomId} = router.query
  return (
    (typeof roomId === "string")?
    <RoomPageInternal roomId={roomId}></RoomPageInternal>
    : null
  )
}
interface Props {
  roomId: string
}
const RoomPageInternal=({roomId}:Props)=>{
  return <div>
    <MessegeComponent roomId={roomId}></MessegeComponent>
    
  </div>

}

export default RoomPage