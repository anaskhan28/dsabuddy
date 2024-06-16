import React from 'react'
import User from './User'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { CornerDownLeft } from 'lucide-react'
type Props = {}

const Chats = (props: Props) => {
  return (
    <div className='bg-[#EBEBEB] w-full flex flex-col justify-between gap-5 max-w-7xl h-screen'>
     <User/>
     <form className="relative overflow-hidden rounded-lg border bg-background px-3"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Enter DSA Problem..."
                className="min-h-20 resize-none border-0 p-3
                  shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
              
                <button type="submit" 
                className="mt-2 inline-flex items-center justify-center whitespace-nowrap
                 text-sm font-medium  ml-auto p-2 rounded-md gap-1.5
                  bg-black text-white hover:text-black hover:bg-white">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </button>
              </div>
            </form>
    </div>
  )
}

export default Chats