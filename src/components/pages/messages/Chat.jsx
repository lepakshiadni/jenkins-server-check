import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import Conversation from "./Conversation";
import Messages from "./Messages";
import { io } from "socket.io-client";
import { IoSearchOutline } from "react-icons/io5";
import "../../styles/Chat.css";
import { useSelector } from "react-redux";
const baseUrl = process.env.REACT_APP_API_URL;

function Chat() {
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);


  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewmessage] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [typingStatusConvo,setTypingStatusConvo] = useState(null);
  // console.log(onlineUser, "onlineUser");
    const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [typingStatus, setTypingStatus] = useState(null);

  const fileInputRef = useRef(null);
    // console.log(selectedConversation, "selectedConversation");
  const employer = useSelector(
    ({ employerSignUp }) => employerSignUp?.employerDetails
  );
  const trainer = useSelector(
    ({ trainerSignUp }) => trainerSignUp?.trainerDetails
  );


//   const markMessageAsRead = async (conversationId) => {
//     // console.log(conversationId, 'conversationId');
//     if(!conversationId) {
//         console.error('Invalid conversation ID:', conversationId);
//         return;
//     }
//     try {
//         const response = await Axios.put(
//             `${baseUrl}/conversation/markAsRead/${conversationId}`,
//             {},
//         );
  
//         if (response.status === 200) {
//             // console.log('Message marked as read:', response.data);
//             // Emit a socket event to notify other users
//             socket.current.emit("readMessage", { conversationId, userId: user?._id });
//         } else {
//             console.error('Failed to mark message as read:', response.data.message);
//         }
//     } catch (error) {
//         console.error('Error marking message as read:', error);
//     }
//   };
 
  

  useEffect(() => {
    if (employer?.success) {
      setUser(employer?.employerDetails);
    }
    if (trainer?.success) {
      setUser(trainer?.trainerDetails);
    }
  }, [employer, trainer]);

  const lastMessageRef = useRef(null);
  const socket = useRef();

  // // console.log("currentChat", currentChat);

  useEffect(() => {
    socket.current = io(`http://13.200.249.41:4040`, {
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "value",
      },
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user?._id);
      socket.current.on("getUsers", (users) => {
        // console.log(users);
        setOnlineUser(users.filter((u) => u.userId !== user?._id));
      });
    }
  }, [user]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.current.off("getMessage");
    };
  }, [user]);
  useEffect(() => {
    socket.current.on("typing", (data) => {
      setTypingStatus(data.senderId);
      setTypingStatusConvo(data.senderId);
      // console.log("Typing", data);
    });

    socket.current.on("stopTyping", (data) => {
      setTypingStatus(false);
      setTypingStatusConvo(false);
    });
  });
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    // Listen for the updateLastMessage event
    socket.current.on(
      "updateLastMessage",
      ({ conversationId, lastMessage }) => {
        setConversation((prev) =>
          prev.map((c) =>
            c._id === conversationId
              ? {
                  ...c,
                  lastMessage: lastMessage,
                }
              : c
          )
        );
      }
    );
  }, [arrivalMessage, messages]);

  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user?._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUser(users.filter((u) => u.userId !== user?._id));
      });
    }
    // Clean up the event listener when the component unmounts
    return () => {
      if (user) {
        socket.current.off("getUsers");
      }
    };
  }, [user]);


  useEffect(() => {
    const getconversation = async () => {
      if (user) {
        await Axios.get(`${baseUrl}/conversation/getConversation/${user?._id}`)
          .then((resp) => {
            console.log(resp.data);
            setConversation(resp.data.conversation);
            setUnreadChatCount(resp.data.
                unreadChatsCount);
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    };
    getconversation();
  }, [user, arrivalMessage,unreadChatCount,typingStatusConvo,typingStatus,selectedConversation,selectedUser]);

  useEffect(() => {
    const getmessage = async () => {
      await Axios.get(`${baseUrl}/message/allMessage/${currentChat?._id}`)
        .then((resp) => {
          // console.log(resp.data.messages,"messages");
          setMessages(resp.data.messages);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    getmessage();
  }, [arrivalMessage, currentChat]);
//   useEffect(() => {
    // const getLastMessage = async () => {
    //     try {
    //         const response = await Axios.get(`${baseUrl}/conversation/lastMessage/${currentChat._id}`);
    //         setLastMessage(response.data?.lastMessage?.lastMessage);
    //       } catch (error) {
    //         console.error("Error fetching last message:", error);
    //       }
    // };
    // getLastMessage();
//   }, []);
  console.log(lastMessage,"lastMessage")

  const handlesubmit = async (event) => {
    event.preventDefault();

    if (!currentChat || !currentChat.members) {
      console.error("Invalid currentChat:", currentChat);
      return;
    }

    const receiver = currentChat.members.find(
      (member) => member?._id !== user?._id
    );
    if (!receiver) {
      console.error(
        "Receiver not found in currentChat.members:",
        currentChat.members
      );
      return;
    }
    if (newmessage?.length > 1) {
      const message = {
        sender: user?._id,
        text: newmessage,
        conversationId: currentChat?._id,
        createdAt: new Date().toISOString(),
      };
      socket.current.emit("sendMessage", {
        senderId: user?._id,
        receiverId: receiver?._id,
        text: newmessage,
      });

      try {
        await Axios.post(`${baseUrl}/message/addMesage`, message).then(
          (resp) => {
            setMessages([...messages, resp.data.savedMessage]);
            setNewmessage("");
          }
        );
      } catch (err) {
        // console.log(err);
      }
      try {
        await Axios.put(
          `${baseUrl}/conversation/updatedLastmessage/${currentChat?._id}`,
          { lastMessage: message }
        )
          .then((resp) => {
            // // console.log(resp.data, "lastMessage");
            setMembers(resp.data.updatedConversation?.members);
            setLastMessage(resp.data.updatedConversation?.lastMessage?.text);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a valid message");
    }
  };
//   console.log(currentChat._id,"LEastaetea Message")
  //for getting receiver Id
  const getRecipientId = (members) => {
    return members?.find((member) => member?._id !== user?._id)?._id;
  };
  const handleFocus = () => {
    // console.log("Typing");
    setTypingStatus(true);
    setTypingStatusConvo(true);
    socket.current.emit("sendTyping", {
      conversationId: currentChat?._id,
      senderId: user?._id,
      receiverId: getRecipientId(currentChat?.members),
      text: "Typing...",
    });
  };

  const handleBlur = () => {
    // console.log("Stopped Typing");
    setTypingStatus(false);
    setTypingStatusConvo(false);
    socket.current.emit("stopTyping", {
      conversationId: currentChat?._id,
      senderId: user?._id,
      receiverId: getRecipientId(currentChat?.members),
    });
  };

  useEffect(() => {
    const receiver = currentChat?.members?.find(
      (member) => member?._id !== user?._id
    );
    setSelectedUser(receiver);
  }, [currentChat?.members, user?._id]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // Filter conversation based on search query
  const filteredConversations = conversation?.filter((conv) =>
    conv?.members?.some(
      (member) =>
        member?.basicInfo?.firstName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        member?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user?._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUser(users.filter((u) => u.userId !== user?._id));
      });
    }
    // Clean up the event listener when the component unmounts
    return () => {
      if (user) {
        socket.current.off("getUsers");
      }
    };
  }, [user]);
  // // console.log('conversation', user?._id);
//   useEffect(() => {
//     const getLastMessage = async () => {
//         try {
//             const response = await Axios.get(`${baseUrl}/conversation/lastMessage/${currentChat._id}`);
//             // setLastMessage(response.data?.lastMessage?.lastMessage);
//             console.log(response)
//           } catch (error) {
//             console.error("Error fetching last message:", error);
//           }
//     };
//     getLastMessage();
//   }, [lastMessage]);
console.log(hasUnreadMessages, "unreadMsgValue")
  return (
    <div className="Rectangle111  w-[100%] h-[75vh]  bg-white rounded-lg border border-zinc-300 flex gap-[4px]  ">
      <div className="w-4.7/12 ">
        <div className="w-auto h-[70vh]  rounded border ml-[20px] mt-[20px]">
          <div className="Messages40 text-gray-800 text-xl font-medium font-['Poppins'] mt-[10px] ml-[8px]">
            Messages <span style={{fontWeight:"bolder"}}>({unreadChatCount})</span>
          </div>
          <form>
            <div className="Rectangle49 w-[290px] h-[50px] mt-[10px] ml-[8px] bg-white rounded-[40px] border border-zinc-300 flex  ">
              <input
                className=" outline-none mt-2 ml-5 h-[30px] placeholder-[#888] placeholder:h-[] w-[] font-['Poppins'] "
                type="text"
                placeholder="Search Friends"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoSearchOutline className=" cursor-pointer absolute w-[20px] h-[20px] ml-[232px] mt-[14px] mb-[16px] mr-[20px] text-[#888888] " />
            </div>
          </form>
          <div className="messageChat  mt-[10px] w-full">
            <div className=" w-[317px] h-[60vh] bg-white   flex flex-col">
              {conversation?.length > 0 ? (
                <>
                  {filteredConversations?.length === 0 || undefined ? (
                    <div className="flex items-center justify-center h-[50%]">
                      <p className="text-gray-500">No conversations found.</p>
                    </div>
                  ) : (
                    <div>
                      {filteredConversations?.map((c, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => {
                                setSelectedConversation(c?._id);
                                // markMessageAsRead(selectedConversation)
                                setCurrentChat(c);
                                // window.location.reload();
                            }}
                          >
                            <Conversation
                              hasUnreadMessages={hasUnreadMessages} 
                              conversation={c}
                              currentuser={user}
                              selectedConversation={
                                selectedConversation === c?._id
                              }
                              lastMessage={lastMessage}
                              onlineUser={onlineUser}
                              selecteduser={selectedUser}
                              typingStatus={typingStatusConvo}
                              members={members}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="h-[50%] flex justify-center items-center ">
                  <span className="items-center">
                    No Conversation Available
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentChat._id  ? (
        <div className="w-9/12 ">
          <div className=" w-auto  h-[70vh] rounded border mt-[20px] mb-[20px]  mr-[20px]  flex flex-col ">
            <div className="flex">
              <div className=" static">
                {selectedUser?.basicInfo?.profileImg ? (
                  <>
                    <img
                      className="Ellipse21 w-[60px] h-[60px] mt-[10px] ml-[16px]  rounded-full"
                      src={selectedUser?.basicInfo?.profileImg}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <div className="w-[60px] h-[60px] mt-[10px] ml-[16px]  rounded-full bg-slate-400 flex justify-center items-center">
                      <p className="  text-['Poppins'] text-lg capitalize">
                        {selectedUser?.fullName[0]}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="Julia text-gray-800 text-xl font-medium font-['Poppins'] mt-[25px] ml-[20px]">
                {selectedUser?.basicInfo?.firstName || selectedUser?.fullName}
              </div>
              <div
                className="w-[170px] h-[43px] ml-[10px] mt-[15px]"
                style={{ textAlign: "right", alignContent: "center" }}
              >
                <p className="text-gray-600 text-sm">
                  {onlineUser.find((user) => user.userId === selectedUser?._id)
                    ? "Online"
                    : ""}
                </p>
                {typingStatus == selectedUser?._id && (
                  <p className="text-gray-600 text-sm">Typing...</p>
                )}
              </div>
            </div>

            <div className="Line10 w-[600px] h-[0px] ml-[20px] mt-[10px] border border-zinc-100 border-opacity-80" />

            <div className="chatcontent flex-grow overflow-y-auto h-[60vh]  ">
              <div>
                {messages?.map((m, index) => {
                  return (
                    <div key={index}>
                      <Messages
                        unreadMsgValue={(value) => setHasUnreadMessages(value)} 
                        messages={m}
                        own={m.sender === user?._id}
                        selecteduser={selectedUser}
                        typingStatus={typingStatus}
                      />
                    </div>
                  );
                })}
              </div>
              <div ref={lastMessageRef} />
            </div>
            <div style={{marginLeft:"10px", marginBottom:"10px"}}>{typingStatus == selectedUser?._id ? "Typing...." : null}</div>
            <div className="">
              <form className="" onSubmit={handlesubmit}>
                <div className="relative flex w-auto  border border-t ">
                  <div className=" left-0 flex w-auto h-[54px] ">
                    <input
                      className=" placeholder outline-none placeholder-slate-500 w-[490px] h-[54px] ml-2 "
                      type="text"
                      placeholder="Type your message"
                      value={newmessage}
                      onChange={(e) => {
                        setNewmessage(e.target.value);
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                  <button
                    className="absolute right-0 w-[92px] h-[54px] bg-[#2676C2] rounded-br-lg  "
                    type="submit"
                  >
                    <svg
                      className="mt-[13px] ml-[31px] mb-[12px] stroke-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M4.56411 11.1421L12.2697 11.1421M18.5623 12.732L4.74058 20.0494C3.50192 20.7052 2.88224 21.0332 2.47381 20.9389C2.11953 20.857 1.8268 20.6099 1.68787 20.2739C1.52767 19.8864 1.74914 19.2205 2.19248 17.8904L4.25236 11.7108C4.32271 11.4998 4.35756 11.3945 4.37153 11.2865C4.38393 11.1907 4.38454 11.0938 4.37215 10.998C4.35849 10.8925 4.32404 10.7892 4.25682 10.5876L2.1922 4.3937C1.74885 3.06366 1.52734 2.39839 1.68754 2.01096C1.82648 1.67495 2.11915 1.42722 2.47343 1.34541C2.88193 1.25108 3.50179 1.57883 4.74085 2.2348L18.5626 9.55218C19.5367 10.0679 20.0238 10.326 20.183 10.67C20.3217 10.9696 20.3219 11.315 20.1832 11.6146C20.024 11.9584 19.537 12.2162 18.5639 12.7314L18.5623 12.732Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-9/12 flex justify-center items-center">
          Open a conversation to start a chat.
        </div>
      )}
    </div>
  );
}

export default Chat;
