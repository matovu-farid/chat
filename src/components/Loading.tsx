import React from 'react'
import { useIsFetching } from 'react-query';
import { SpinnerCircular } from 'spinners-react';
import { trpc } from '../utils/trpc';

interface Props{
  enabled?: boolean | undefined
}

const Loading = ({enabled=true}:Props) => {
  const isFetching = useIsFetching()
  return (
    <div className='fixed top-0 right-0'>

      <SpinnerCircular enabled={isFetching>0}  />
    </div>
  )
}

export default Loading