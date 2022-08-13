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
    <p>You are now on room with id : {roomId}</p>
    <MessegeComponent roomId={roomId}></MessegeComponent>
    
  </div>

}
interface Params {
  params: {
    roomId: string
  }
}


export default RoomPage