"use client"
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
  } from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from './ui/button'
import { MessageCircleCodeIcon, MoveLeftIcon } from 'lucide-react'
import WorkspaceHistory from './WorkspaceHistory'
import Footer from './Footer'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  return (
       <Sidebar  >
      <SidebarHeader style={{backgroundColor: "black"}}  className="p-3 flex justify-between items-center ">
        <Link 
          href="/" 
          className="cursor-pointer hover:opacity-80 transition-opacity duration-300 block relative z-10"
          style={{ display: 'block', pointerEvents: 'auto' }}
          onClick={() => console.log('Logo clicked!')}
        >
          <Image src={'/logo.png'} alt='log' width={35} height={35} />
        </Link>
        <div>
    <div className={"cursor-pointer text-2xl opacity-65"} onClick={toggleSidebar}> 
        <svg  xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
    </div>

        </div>
        {/* <Button className="mt-5"> <MessageCircleCodeIcon /> Start a new chat</Button> */}
      </SidebarHeader>
      <SidebarContent style={{backgroundColor: "black"}} className='p-3'>
        
        <SidebarGroup style={{backgroundColor: "black"}}>
            <WorkspaceHistory />
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter style={{backgroundColor: "black"}} >
        <Footer />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
