import Track from '@/components/track'
import getUserData from '../actions/getUserData'
import { redirect } from 'next/navigation';
import User from '@/components/User';

type Props = {}

const track = async (props: Props) => {
  const userData = await getUserData();
  console.log(userData)
if(!userData){

  return redirect('/signup')
}

  return (
    <div>
     <div className='flex justify-start ml-[17rem]'>
     <User/>
     </div>
      <Track/>
    </div>
  )
}

export default track