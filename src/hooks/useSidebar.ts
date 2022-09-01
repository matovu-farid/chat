import create from "zustand";
import React from 'react'

interface SidebarState {
  isOpen:boolean,
  openSidebar:()=>void,
  closeSidebar:()=>void
}

const useSidebar = create<SidebarState>()((set)=>({
  isOpen:false,
  openSidebar:()=>{
    set({isOpen:true})
  },
  closeSidebar:()=>{
    set({isOpen:false})
  }
}))

export default useSidebar