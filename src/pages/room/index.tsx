import { useSession } from 'next-auth/react'
import React, { PropsWithoutRef, useEffect, useState } from 'react'
import Page from '../../../components/page'
import Room from '../../Interfaces/Room'
import { trpc } from '../../utils/trpc'
interface Props {
  userId: string
}
const RoomsInternal=({userId}:Props)=>{
  const roomQuery = trpc.useQuery(["room.getRooms",userId])
  const rooms = roomQuery.data
  return <ul>
    {
      (rooms && rooms.length > 0)?
      rooms.map(room=>(<li key={room.id}>{room.name}</li>))
      : <h2 className='text-gray-900 text-4xl '>No rooms found</h2>
    }
  </ul>
}
const Rooms = () => {
  const session = useSession()
  const userId = session.data?.user?.id
 
  return (
    <Page>
      {
        (userId)?
      <RoomsInternal userId={userId}/>
      :
      <p>You are not signed in</p>
      }
      
    </Page>
  )
}


export default Rooms