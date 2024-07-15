import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import timesago from "timesago";
import { io } from "socket.io-client";

const baseUrl = process.env.REACT_APP_API_URL;
console.log('baseUrl',baseUrl)
function Conversation({ hasUnreadMessages, conversation, currentuser, selectedConversation, lastMessage, onlineUser, typingStatus, members }) {
  const [user, setUser] = useState(null);
  // console.log(hasUnreadMessages, "hasUnreadMessages")
  const [lastmessage, setLastmessage] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [lastMessageStatus, setLastMessageStatus] = useState(null);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [activeTypingUser, setActiveTypingUser] = useState(null);
  const isFetching = useRef(false);
  // console.log(lastMessage, "lastMessage");
  useEffect(() => {
    if (typingStatus) {
      setActiveTypingUser(typingStatus);
    } else {
      setActiveTypingUser(null);
    }
  }, [typingStatus]);

  useEffect(() => {
    const newSocket = io('http://13.200.249.41:4040');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const friendid = conversation?.members?.find((m) => m?._id !== currentuser?._id);
    setUser(friendid);

    const fetchLastMessage = async () => {
      if (isFetching.current) return;
      isFetching.current = true;
      try {
        const response = await Axios.get(`${baseUrl}/conversation/lastMessage/${conversation._id}`);
        setLastmessage(response.data?.lastMessage?.lastMessage);
        setUnreadMessageCount(response.data?.unreadCount);
        setLastMessageStatus(response.data);
        // setUnreadChatCount(response.data?.unreadCount);
      } catch (error) {
        console.error("Error fetching last message:", error);
      }
      isFetching.current = false;
    };

    fetchLastMessage();

    if (socket) {
      socket.on("getMessage", (data) => {
        if (data.conversationId === conversation._id) {
          setLastmessage(data);
        }
      });

      socket.on("sendTyping", (data) => {
        if (data.conversationId === conversation._id) {
          setIsTyping(true);
          setActiveTypingUser(data?.senderId);
        }
      });

      socket.on("stopTyping", (data) => {
        if (data.conversationId === conversation._id) {
          setIsTyping(false);
        }
      });
    }
  }, [conversation, currentuser, lastmessage, socket]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastmessage) {
        setTimeAgo(timesago(lastmessage?.createdAt));
      }
    }, 5000);

    if (lastmessage) {
      setTimeAgo(timesago(lastmessage?.createdAt));
    }

    return () => clearInterval(intervalId);
  }, [lastmessage]);

  const isUserOnline = onlineUser?.some((u) => u.userId === user?._id);
  // console.log(hasUnreadMessages, unreadMessageCount, lastmessage.sender, user?._id)
  // console.log(unreadMessageCount, "unreadMessageCount")
  return (
      {/* <p>
        {unreadChatCount}
      </p> */}

    <div className={`${selectedConversation ? "Rectangle115 hover:cursor-pointer w-full h-[70px] flex justify-between justify-items-center bg-[#E3E3E3]" : "Rectangle115 hover:cursor-pointer w-[317px] h-[70px] flex justify-between justify-items-center bg-white"} ${(!hasUnreadMessages && (unreadMessageCount != 0) && lastmessage.sender == user?._id) ? "bg-[#2676c2]" : ""}`}>

      <div className="flex">
        <div className="mt-[12px] ml-[10px]">
          <div className="Group1189 w-[51px] h-[51px] rounded-[50%] relative">
            {isUserOnline && (
              <div className="absolute top-0">
                <svg width="55" height="55" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Group 1189">
                    <circle id="Ellipse 112" cx="24" cy="24" r="24" fill="#00D46F" fillOpacity="0.2" />
                    <circle id="Ellipse 113" cx="24.0007" cy="23.9987" r="22.6667" fill="#00D46F" fillOpacity="0.5" />
                    <circle id="Ellipse 114" cx="23.9993" cy="24.0013" r="21.3333" fill="#00D46F" fillOpacity="0.8" />
                  </g>
                </svg>
              </div>
            )}
            <div className="absolute top-1 z-10 left-1">
              {user?.basicInfo?.profileImg ? (
                <img
                  className="Image14 w-[47px] h-[47px] rounded-[50%]"
                  src={user?.basicInfo?.profileImg}
                  alt=""
                />
              ) : (
                <div className="w-[47px] h-[47px] absolute rounded-[50%] bg-slate-400 flex justify-center items-center">
                  <p className="text-['Poppins'] text-lg">
                    {user?.basicInfo?.firstName ? user?.basicInfo?.firstName[0] : user?.fullName[0]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 ml-[10px] mt-[13px]">
          <div className="Charlie text-gray-800 text-base font-medium font-['Poppins'] capitalize">
            {user?.basicInfo?.firstName || user?.fullName}
          </div>
          <div className="Typing text-neutral-500 text-xs font-normal font-['Poppins']">
            {user?._id == activeTypingUser ? "Typing..." : lastmessage ? lastmessage?.text.slice(0, 10) + "..." : "No messages"}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 mr-[10px]">
        <div className="00 text-neutral-500 text-xs font-normal font-['Poppins'] mt-[13px]">
          {timeAgo}
        </div>
      </div>

      {!hasUnreadMessages && (unreadMessageCount != 0) && lastmessage.sender == user?._id && <div className="w-5 h-5 flex text-sm relative right-2 top-2 justify-center items-center text-white bg-[#2676c2] rounded-full">
        {unreadMessageCount}
      </div>}
    </div>
  );
}

export default Conversation;
