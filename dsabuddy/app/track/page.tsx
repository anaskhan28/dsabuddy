import React from 'react'
import getUserData from '../actions/getUserData'
import { redirect } from 'next/navigation';

type Props = {}



const Track = async (props: Props) => {
  const userData = await getUserData();
  console.log(userData)
if(!userData){

  return redirect('/signup')
}
  return (
    <div>Track</div>
  )
}

export default Track