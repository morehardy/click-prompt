import React from "react";
import { ChatRoom } from "@/app/[lang]/chatgpt/ChatRoom";
import { LoginPage } from "@/app/[lang]/chatgpt/LoginPage";
import { SITE_URL } from "@/configs/constants";

export default async function ChatGPTPage() {
  console.log("ChatGPTPage rendered");

  try {
    const response = await fetch(`${SITE_URL}api/chatgpt/verify`);
    const data = await response.json();
    console.log(data);

    return (
      <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
        {data.isLoggedIn ? <ChatRoom /> : <LoginPage />}
      </div>
    );
  } catch (error) {
    console.log(error);
  }

  return <></>;
}
