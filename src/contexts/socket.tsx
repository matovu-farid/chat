import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";



let socketCtx = createContext(io())

import React from 'react'
declare global {
  var socket: Socket | undefined
}

const SocketProvider = ({children}: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket|null>(null)
    const createSocket= async()=>{
      if(global.socket){
        setSocket(global.socket) 
        return
      }
        await fetch('/api/socket')
        const socketCreated = io()
        global.socket = socketCreated
        setSocket(socketCreated)
      
    }
    useEffect(()=>{
      createSocket()
    },[])

  return (
    (socket)?
    <socketCtx.Provider value={socket}>{children}</socketCtx.Provider>
    : null
  )
}
export {socketCtx};
export default SocketProvider