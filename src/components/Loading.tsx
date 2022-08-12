import React from 'react'
import { SpinnerCircular } from 'spinners-react';

interface Props{
  enabled?: boolean | undefined
}

const Loading = ({enabled=true}:Props) => {
  return (
    <div className='w-full h-full'>

      <SpinnerCircular enabled={enabled}  />
    </div>
  )
}

export default Loading