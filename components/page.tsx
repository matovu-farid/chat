import React, {  PropsWithChildren } from 'react'

const Page = ({children}:PropsWithChildren) => {
  return (
      <div className='w-full min-h-screen flex flex-col justify-center align-middle'>
      {
        children
      }

    </div>
  )
}

export default Page