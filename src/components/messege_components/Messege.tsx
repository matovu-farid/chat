import React from 'react'
import { MessegeWithUser } from '../../Interfaces/Messege'

const Messege = (messege: MessegeWithUser) => {
  const {createdAt,text,sender:{name:senderName}} = messege
  const getTime=(dateString:string)=>{
    const date = new Date(dateString)
    return {
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString()
    }
  }
  const {time, date} = getTime(createdAt)
  return (
    <div className='rounded-2xl max-w-sm w-4/5 text-gray-900'>
     
      <p className='p-2 text-sm'>{text}</p>
      <div className='p-1 text-xs flex justify-end'>
        <p>
          {
            `${time} on ${date}`
          }
        </p>

      <p>{senderName}</p>
      </div>


    </div>
  )
}

export default Messege