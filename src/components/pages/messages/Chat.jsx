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
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);
  const socket = useRef();
  const lastMessageRef = useRef(null);

  const employer = useSelector(({ employerSignUp }) => employerSignUp?.employerDetails);
  const trainer = useSelector(({ trainerSignUp }) => trainerSignUp?.trainerDetails);

  useEffect(() => {
    if (employer?.success) {
      setUser(employer?.employerDetails);
    }
    if (trainer?.success) {
      setUser(trainer?.trainerDetails);
    }
  }, [employer, trainer]);

  useEffect(() => {
    socket.current = io(`http://localhost:4040`, {
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
        setOnlineUsers(users.filter((u) => u.userId !== user?._id));
      });
    }

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket.current.on("typing", (data) => {
      setTypingUsers((prevTypingUsers) => {
        if (!prevTypingUsers.includes(data.senderId)) {
          return [...prevTypingUsers, data.senderId];
        }
        return prevTypingUsers;
      });
    });

    socket.current.on("stoppedTyping", (data) => {
      setTypingUsers((prevTypingUsers) =>
        prevTypingUsers.filter((userId) => userId !== data.senderId)
      );
    });

    return () => {
      socket.current.off("getMessage");
      socket.current.off("typing");
      socket.current.off("stoppedTyping");
    };
  }, [user]);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members?.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      if (user) {
        try {
          const resp = await Axios.get(`${baseUrl}/conversation/getConversation/${user?._id}`);
          setConversation(resp.data.conversation);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const resp = await Axios.get(`${baseUrl}/message/allMessage/${currentChat?._id}`);
          setMessages(resp.data.messages);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentChat || !newMessage.trim()) {
      return;
    }

    const receiver = currentChat.members.find((member) => member?._id !== user?._id);

    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
      createdAt: new Date().toISOString(),
    };

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId: receiver?._id,
      text: newMessage,
    });

    try {
      const resp = await Axios.post(`${baseUrl}/message/addMesage`, message);
      setMessages([...messages, resp.data.savedMessage]);
      setNewMessage("");

      await Axios.put(`${baseUrl}/conversation/updatedLastmessage/${currentChat?._id}`, { lastMessage: message });
      setLastMessage(resp.data.updatedConversation?.lastMessage?.text);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentChat) {
      setSelectedUser(currentChat.members.find((member) => member?._id !== user?._id));
    }
  }, [currentChat, user]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredConversations = conversation?.filter((conv) =>
    conv?.members?.some((member) =>
      member?.basicInfo?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleTyping = () => {
    socket.current.emit("typing", {
      conversationId: currentChat?._id,
      senderId: user?._id,
    });
  };

  const handleStoppedTyping = () => {
    socket.current.emit("stoppedTyping", {
      conversationId: currentChat?._id,
      senderId: user?._id,
    });
  };

  return (
    <div className="Rectangle111 w-[100%] h-[75vh] bg-white rounded-lg border border-zinc-300 flex gap-[4px]">
      <div className="w-4.7/12">
        <div className="w-auto h-[70vh] rounded border ml-[20px] mt-[20px]">
          <div className="Messages40 text-gray-800 text-xl font-medium font-['Poppins'] mt-[10px] ml-[8px]">
            Messages
          </div>
          <form>
            <div className="Rectangle49 w-[290px] h-[50px] mt-[10px] ml-[8px] bg-white rounded-[40px] border border-zinc-300 flex">
              <input
                className="outline-none mt-2 ml-5 h-[30px] placeholder-[#888] w-full"
                type="text"
                placeholder="Search Friends"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoSearchOutline className="cursor-pointer absolute w-[20px] h-[20px] ml-[232px] mt-[14px] mb-[16px] mr-[20px] text-[#888888]" />
            </div>
          </form>
          <div className="messageChat mt-[10px] w-full">
            <div className="w-[317px] h-[60vh] bg-white flex flex-col">
              {conversation?.length > 0 ? (
                filteredConversations?.length === 0 || undefined ? (
                  <div className="flex items-center justify-center h-[50%]">
                    <p className="text-gray-500">No conversations found.</p>
                  </div>
                ) : (
                  filteredConversations?.map((c, index) => (
                    <div key={index} onClick={() => setCurrentChat(c)}>
                      <Conversation
                        conversation={c}
                        currentuser={user}
                        selectedConversation={currentChat?._id === c?._id}
                        lastMessage={lastMessage}
                        onlineUser={onlineUsers}
                      />
                    </div>
                  ))
                )
              ) : (
                <div className="h-[50%] flex justify-center items-center">
                  <span className="items-center">No Conversation Available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentChat?._id ? (
        <div className="w-7/12 h-[70vh]">
          <div className="w-full h-[20%] rounded border mt-[20px]">
            <div className="w-[50%] h-[70px] border ml-[240px] mt-[20px] rounded-lg flex items-center justify-center">
              <span className="text-lg font-semibold">
                Chat with {selectedUser?.fullName}
              </span>
            </div>
          </div>

          <div className="w-full h-[80%] border mt-[20px] overflow-y-auto">
            <div className="flex flex-col gap-[10px] px-[20px] py-[10px]">
              {messages.map((m, index) => (
                <div key={index} ref={lastMessageRef}>
                  <Messages message={m} own={m.sender === user?._id} />
                </div>
              ))}
              {typingUsers.length > 0 && (
                <div className="text-gray-500 text-sm mt-2">
                  {typingUsers.map((userId) => {
                    const typingUser = currentChat.members.find((member) => member._id === userId);
                    return (
                      <div key={userId}>
                        {typingUser?.fullName} is typing...
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex items-center mt-2">
            <input
              className="w-full h-[50px] rounded border px-[10px]"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onFocus={handleTyping}
              onBlur={handleStoppedTyping}
            />
            <button
              className="ml-2 px-4 py-2 rounded bg-blue-500 text-white"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="w-7/12 h-[70vh] flex items-center justify-center">
          <span className="text-gray-500">Select a conversation to start chatting</span>
        </div>
      )}
    </div>
  );
}

export default Chat;

