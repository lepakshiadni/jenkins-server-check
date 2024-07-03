import React, { useEffect, useState } from "react";
import Axios from "axios";
import timesago from "timesago";
import { io } from "socket.io-client";
const baseUrl = process.env.REACT_APP_API_URL;

function Conversation({ conversation, currentuser, selectedConversation, lastMessage, onlineUser }) {
  const [user, setUser] = useState(null);
  const [lastmessage, setLastmessage] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:4040');
    setSocket(newSocket);

    return () => {
      // Clean up socket connection
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const friendid = conversation?.members?.find((m) => m?._id !== currentuser?._id);
    setUser(friendid);

    const fetchLastMessage = async () => {
      try {
        const response = await Axios.get(`${baseUrl}/conversation/lastMessage/${conversation._id}`);
        setLastmessage(response.data?.lastMessage?.lastMessage);
      } catch (error) {
        console.error("Error fetching last message:", error);
      }
    };
    fetchLastMessage();

    // Listen for new messages
    if (socket) {
      socket.on("getMessage", (data) => {
        if (data.conversationId === conversation._id) {
          setLastmessage(data);
        }
      });
    }
  }, [conversation, currentuser, lastMessage, socket]);

  useEffect(() => {
    // Update the timeAgo state periodically
    const intervalId = setInterval(() => {
      if (lastmessage) {
        setTimeAgo(timesago(lastmessage?.createdAt));
      }
    }, 5000); // Update every 60 seconds

    // Set the initial timeAgo value
    if (lastmessage) {
      setTimeAgo(timesago(lastmessage?.createdAt));
    }

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [lastmessage]);

  const isUserOnline = onlineUser.some((u) => u.userId === user?._id);

  return (
    <div>
      <div className={`${selectedConversation ? "Rectangle115 hover:cursor-pointer  w-full h-[70px] flex justify-between justify-items-center bg-[#E3E3E3]" : "Rectangle115 hover:cursor-pointer  w-[317px] h-[70px] flex justify-between justify-items-center bg-white"}`}>
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
              {lastmessage ? lastmessage?.text : "No messages"}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mr-[10px]">
          <div className="00 text-neutral-500 text-xs font-normal font-['Poppins'] mt-[13px]">
            {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
