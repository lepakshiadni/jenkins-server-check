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
  const [istyping, setIstyping] = useState(false);
  const [notification, setNotification] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  // console.log("typing", istyping);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   console.log('Selected File:', selectedFile);
  // };

  const employer = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails;
  });
  const trainer = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.trainerDetails;
  });

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

  // console.log("currentChat", currentChat);

  useEffect(() => {
    socket.current = io(`http://13.235.90.102:4040`, { 
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "value",
      },
    });

  }, []);
  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user?._id);
      socket.current.on("getUsers", (users) => {
        console.log(users);
      });
    }
  }, [user]);

  useEffect(() => {
    //receive message  from server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });

      // Debounce incoming messages to update state less frequently
      // const timeout = setTimeout(() => {
      //   setArrivalMessage((prev) => [...prev, data]);
      // }, 300);

      // return () => clearTimeout(timeout);
      console.log("data form server ", data)
    });
    return () => {
      socket.current.off('getMessage');
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    // Process arrivalMessages and update state accordingly
    // if (arrivalMessage?.length > 0) {
    //   // Process and update state with the batch of messages
    //   setMessages((prevMessages) => [...prevMessages, ...arrivalMessage]);
    //   setArrivalMessage([]);
    // }
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
      socket.current.on("getUsers", (users) => {
        // Filter out the current user's ID from the list of online users
        const filteredUsers = users.filter((u) => u.userId !== user?._id);
        setOnlineUser(filteredUsers);
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
            // console.log(resp.data);
            setConversation(resp.data.conversation);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getconversation();
  }, [user]);

  useEffect(() => {
    const getmessage = async () => {
      await Axios.get(`${baseUrl}/message/allMessage/${currentChat?._id}`)
        .then((resp) => {
          // console.log(resp.data.messages);
          setMessages(resp.data.messages);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getmessage();
  }, [arrivalMessage, currentChat]);

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
        await Axios.post(`${baseUrl}/message/addMesage`, message).then((resp) => {
          setMessages([...messages, resp.data.savedMessage]);
          setNewmessage(" ");

        });
      } catch (err) {
        console.log(err);
      }
      try {
        await Axios.put(
          `${baseUrl}/conversation/updatedLastmessage/${currentChat?._id}`,
          { lastMessage: message }
        )
          .then((resp) => {
            console.log(resp.data);
            setLastMessage(resp.data.updatedConversation?.lastMessage?.text);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alert('Please enter a valid message')
    }
  };
  //for getting receiver Id
  const getRecipientId = (members) => {
    return members?.find((member) => member?._id !== user?._id)?._id;
  };
  // Emit typing event when user starts typing
  const handleTyping = () => {
    socket.current.emit("typing", {
      conversationId: currentChat?._id,
      senderId: user?._id,
      receiverId: getRecipientId(currentChat?.members),
    });
  };

  // Emit stopped typing event when user stops typing
  const handleStoppedTyping = () => {
    socket.current.emit("stoppedTyping", {
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

  console.log('conversation', conversation);

  return (
    <div className="Rectangle111  w-[100%] h-[75vh]  bg-white rounded-lg border border-zinc-300 flex gap-[4px]  ">
      <div className="w-4.7/12 ">
        <div className="w-auto h-[70vh]  rounded border ml-[20px] mt-[20px]">
          <div className="Messages40 text-gray-800 text-xl font-medium font-['Poppins'] mt-[10px] ml-[8px]">
            Messages
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
              {/* {conversation?.map((c, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      // setCurrentChat((prevChat) => {
                      //   if (prevChat === c) {
                      //     return; // Toggle off if the conversation is already selected
                      //   }
                      //   setSelectedConversation(c?._id); // Set the selected conversation ID
                      //   // return c;
                      // });
                      setCurrentChat(c);
                      setSelectedConversation(c?._id);
                    }}
                  >
                    <Conversation
                      conversation={c}
                      currentuser={user}
                      selectedConversation={selectedConversation === c?._id}
                      lastMessage={lastMessage}
                      onlineUser={onlineUser}
                    />
                  </div>
                );
              })} */}
              {
                conversation?.length > 0 ?
                  <>

                    {filteredConversations?.length === 0 || undefined ? (
                      <div className="flex items-center justify-center h-[50%]">
                        <p className="text-gray-500">No conversations found.</p>
                      </div>
                    ) : (
                      <div>

                        {
                          filteredConversations?.map((c, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  setCurrentChat(c);
                                  setSelectedConversation(c?._id);
                                }}
                              >
                                <Conversation
                                  conversation={c}
                                  currentuser={user}
                                  selectedConversation={selectedConversation === c?._id}
                                  lastMessage={lastMessage}
                                  onlineUser={onlineUser}
                                />
                              </div>
                            );
                          })
                        }
                      </div>
                    )}
                  </>
                  :
                  <div className="h-[50%] flex justify-center items-center "  >
                    <span className="items-center">
                    No Conversation Available
                    </span>
                  </div>

              }
            </div>
          </div>
        </div>
      </div>

      {currentChat._id ? (
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
            </div>

            <div className="Line10 w-[600px] h-[0px] ml-[20px] mt-[10px] border border-zinc-100 border-opacity-80" />

            <div className="chatcontent flex-grow overflow-y-auto h-[60vh]  ">
              <div>
                {messages?.map((m, index) => {
                  return (
                    <div key={index}>
                      <Messages
                        messages={m}
                        own={m.sender === user?._id}
                        selecteduser={selectedUser}
                      />
                    </div>
                  );
                })}
              </div>
              <div ref={lastMessageRef} />
            </div>

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
                      onKeyDown={handleTyping}
                      onKeyUp={handleStoppedTyping}
                    />
                    {/* <div className=" absolute left-[80%]">
                      <div onClick={handleButtonClick}>
                        <button className="h-[58px] ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="20"
                            viewBox="0 0 19 20"
                            fill="none"
                          >
                            <path
                              d="M16.7655 1.36747C14.9422 -0.455823 11.9451 -0.455823 10.1218 1.36747L0.131127 11.3331C-0.043709 11.508 -0.043709 11.7827 0.131127 11.9575C0.305963 12.1324 0.580706 12.1324 0.755542 11.9575L10.7462 1.99188C12.2448 0.493288 14.6675 0.493288 16.1411 1.99188C16.8654 2.7162 17.2651 3.66531 17.2651 4.68935C17.2651 5.71339 16.8654 6.6625 16.1411 7.38683L12.8192 10.7087L5.12644 18.4015C4.20231 19.3256 2.72869 19.3256 1.80456 18.4015C1.77958 18.3765 1.75461 18.3515 1.70465 18.2766C0.880425 17.3525 0.930378 15.9538 1.80456 15.0796L9.49735 7.38683L12.7943 4.08992C12.9691 3.91508 13.1689 3.84015 13.3937 3.84015C13.6185 3.84015 13.8433 3.94006 13.9931 4.08992C14.3178 4.41461 14.3178 4.9641 13.9931 5.31377L7.1995 12.1574C7.02466 12.3322 7.02466 12.6069 7.1995 12.7818C7.37434 12.9566 7.64908 12.9566 7.82391 12.7818L14.6425 5.96316C15.3169 5.28879 15.3169 4.16485 14.6425 3.49048C14.3178 3.16578 13.8682 2.99095 13.4187 2.99095C12.9441 2.99095 12.5195 3.16578 12.1948 3.49048L1.20512 14.4802C0.00624418 15.6791 -0.0686857 17.6022 1.03028 18.8511C1.08024 18.926 1.13019 18.976 1.20512 19.0509C1.80456 19.6503 2.62879 20 3.47799 20C4.35217 20 5.15142 19.6753 5.75086 19.0509L6.79988 18.0019L16.7655 8.03622C17.6397 7.16204 18.1392 5.96316 18.1392 4.71433C18.1392 3.44052 17.6397 2.24165 16.7655 1.36747Z"
                              fill="#888888"
                            />
                          </svg>
                        </button>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                      </div>
                    </div> */}
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
