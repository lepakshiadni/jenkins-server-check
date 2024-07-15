import React, { useEffect, useState } from "react";
import Time from "timesago";
import { useSelector } from "react-redux";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;
function Messages({unreadMsgValue, messages, own, selecteduser, typingStatus }) {
  // console.log(unreadMsgValue, "unreadMsgValue")
  const [ownUser, setOwnUser] = useState(null);
  const [timeAgo, setTimeAgo] = useState(Time(messages?.createdAt));
  // // console.log(messages, "messages");
  const markAsReadTimeoutRef = React.useRef(null);
  const employer = useSelector(
    ({ employerSignUp }) => employerSignUp?.employerDetails
  );
  const trainer = useSelector(
    ({ trainerSignUp }) => trainerSignUp?.trainerDetails
  );


  useEffect(() => {
    if (employer?.success) {
      setOwnUser(employer?.employerDetails);
    }
    if (trainer?.success) {
      setOwnUser(trainer?.trainerDetails);
    }
  }, [employer, trainer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(Time(messages?.createdAt));
    }, 5000); // Update every 60 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [messages?.createdAt]);

  useEffect(() => {
    if (!own && !messages.isRead) {
      updateMessageStatus(messages._id);
    }
  }, [messages, own]);

  const updateMessageStatus = async (messageId) => {
    // console.log(messageId, 'messageId')
    try {
      const response = await axios.put(`${baseUrl}/message/updateMessageStatus/${messageId}`);
      if (response.data.success) {
        unreadMsgValue(true);
        // console.log('Message status updated successfully', response.data.updatedMessage);
      } else {
        console.error('Failed to update message status');
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  // // console.log(messages.conversationId,"messages")
  // useEffect(() => {
  //   if (messages.conversationId && !messages.isRead) {
  //     if(markAsReadTimeoutRef.current){
  //       clearTimeout(markAsReadTimeoutRef.current);
  //     }
  //     markAsReadTimeoutRef.current = setTimeout(() => {
  //       markMessageAsRead(messages.conversationId);
  //     }, 2000);

  //     return () => {
  //       if(markAsReadTimeoutRef.current){
  //         clearTimeout(markAsReadTimeoutRef.current);
  //       }
  //     };
  //   }
  // }, [messages]);
  useEffect(() => {
    if (!messages?.isRead) {
      markMessageAsRead(messages.conversationId);
    }
  }, [messages]);
    console.log(messages, 'messages')
  const markMessageAsRead = async (conversationId) => {
    // console.log(conversationId, 'conversationId');
    if(!conversationId) {
        console.error('Invalid conversation ID:', conversationId);
        return;
    }
    try {
        const response = await axios.put(
            `${baseUrl}/conversation/markAsRead/${conversationId}`,
            {},
        );
  
        if (response.status === 200) {
            // console.log('Message marked as read:', response.data);
            unreadMsgValue(true);
            // Emit a socket event to notify other users
            // socket.current.emit("readMessage", { conversationId, userId: user?._id });
        } else {
            console.error('Failed to mark message as read:', response.data.message);
        }
    } catch (error) {
        console.error('Error marking message as read:', error);
    }
  };
  // markMessageAsRead(messages.conversationId)
  
  return (
    <div>
      {own ? (
        <div className="flex flex-row-reverse gap-4 mr-[21px] space-y-1 mb-[20px] items-center">
          <div>
            {ownUser?.basicInfo?.profileImg ? (
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={ownUser?.basicInfo?.profileImg}
                alt=""
              />
            ) : (
              <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-slate-500">
                <p className="text-lg">{ownUser?.fullName[0]}</p>
              </div>
            )}
          </div>
          <div className="w-auto">
            <div className="text-white text-xs font-normal bg-[#2676c2] text-end rounded-tl-lg rounded-tr-[20px] rounded-bl-lg flex justify-end pr-[10px] h-9 items-center">
              {messages?.text}
            </div>
            <div className="messageBottom text-zinc-400 text-end mt-[5px] text-[10px]">
              {timeAgo}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex ml-[21px] space-x-1 mb-[20px]">
          <div>
            {selecteduser?.basicInfo?.profileImg ? (
              <img
                className="w-[40px] h-[40px] rounded-full mt-[10px]"
                src={selecteduser?.basicInfo?.profileImg}
                alt=""
              />
            ) : (
              <div className="w-[40px] h-[40px] rounded-full mt-[10px] flex justify-center items-center bg-slate-500">
                <p className="text-lg">{selecteduser?.fullName[0]}</p>
              </div>
            )}
          </div>
          <div>
            <div className="w-full h-9 bg-zinc-100 rounded-tl-[20px] rounded-tr-lg rounded-br-lg border border-gray-200 flex items-center px-2">
              <div className="text-neutral-500 text-xs font-normal">
                {messages?.text}
              </div>
            </div>
            <div className="messageBottom text-zinc-400 text-[10px] ml-2">
              {timeAgo}
            </div>
            {/* <div>{typingStatus == selecteduser._id ? "typing...." : null}</div> */}
          </div>
          {/* <div>{typingStatus == selecteduser._id ? "typing...." : null}</div> */}
        </div>
      )}
    </div>
  );
}

export default Messages;
