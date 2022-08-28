import React from 'react'
interface Props {
  children: React.ReactNode
}

const Notification = ({children}:Props) => {
  return (
    <div className='fixed top-[25%] -left-[10%] -translate-x-[20%] transition-transform'>
      {children}
    </div>
  )
}

export default Notification