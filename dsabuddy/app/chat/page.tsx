"use client";
import { useChat } from "ai/react";
import {
  Bot,
  Loader,
  Loader2,
  MoreHorizontal,
  Plus,
  Send,
  User2,
  X,
} from "lucide-react";
import Image from "next/image";
import Markdown from "@/components/markdown";
import { ChangeEvent, useState } from "react";
import SelectedImages from "@/components/selectedImages";
import Messages from "@/components/message";
import InputForm from "@/components/inputForm";
import SideNavbar from "@/components/SideNavbar";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
      sendExtraMessageFields: true,
      initialInput: "Please Enter the copied title of your DSA Problem"
      
    });

  return (
    <div className="flex justify-between ">
   <SideNavbar/>

    <main className="bg-[#181818] w-full min-h-screen flex px-10 flex-col justify-between gap-5 max-w-7xl ">
    <Messages messages={messages} isLoading={isLoading} />
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
      />
     
    </main>
    </div>
  );
}
// import React from 'react'



// const ChatWithQuestion = ({params}: {
//     params: {chatId: string}
// }) => {
//   return (
//     <div className='bg-white flex justify-between w-full h-screens text-black'>
       
//     <SideNavbar/>
//     <h1 className='text-black text-center absolute'>ChatWithQuestion {params.chatId}
//     </h1>
//      <Chats/>
//     </div>
//   )
// }


// export default ChatWithQuestion