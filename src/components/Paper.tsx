import React, { PropsWithChildren } from 'react'
interface Props extends PropsWithChildren{
  className?: string
  
}

const Paper = ({children,className=''}:Props) => {
  return (
    <div className={className+ ' shadow-lg rounded-2xl text-gray-900 bg-white'}>{children}</div>
  )
}

export default Paper