import { useRouter } from 'next/router'
import React from 'react'
import PrivateConversation from '../../../components/messege_components/Convesation'
import MessegeList from '../../../components/messege_components/MessegeList'
import MessegeTextField from '../../../components/messege_components/MessegeTextField'
import PrivateMessegeTextField from '../../../components/messege_components/PrivateTextfield'
import { trpc } from '../../../utils/trpc'

const Chat = () => {
  const  {query} = useRouter()
  const receiverId = query.receiverId as string
  const senderId = query.senderId as string
  const {data:conversation} = trpc.useQuery(["message.getConversation",{receiverId,senderId}]);

  return (
    <section className="w-full h-full flex flex-col justify-end">
      <PrivateConversation className="h-full" roomId={roomId}></Private>
      <PrivateMessegeTextField
        className=" flex-none w-full"
        senderId={user.id}
        roomId={roomId}
      ></Private>
    </section>
  )
}

export default Chat