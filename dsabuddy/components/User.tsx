import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import getUserData from '@/app/actions/getUserData'
type Props = {}

const User = async (props: Props) => {
    const user = await getUserData();
   
  return (
    <div className='flex flex-col gap-1 p-6'>
    <div className='flex flex-row gap-2'>
    <Avatar>
      <AvatarImage src={user?.avatar_url}alt="profile" />
      <AvatarFallback>User Profile</AvatarFallback>
    </Avatar>
    <span className='text-lg font-bold text-white '>Hello, {user?.full_name}</span>
    </div>

    <p className='text-md text-gray-400'>Answer the question in chat and we’ll track, based on your interests</p>
    </div>
  )
}

export default User