import React, { useEffect, useRef, useState } from "react";
import { HiMiniLink } from "react-icons/hi2";
import { IoIosSend } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import OverlappingProfiles from "../OverlappingProfiles";
import { useSocket } from "../../contexts/socketContext";
import ReactScrollToBottom from "react-scroll-to-bottom";
import StdChatMessage from "./StdChatMessage";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

export default function StdGroupChat() {
  const [messages, setMessages] = useState([]);
  const hasJoined = useRef(false);
  const { socket } = useSocket();
  const [input, setInput] = useState("");
  const { projectId } = useParams();
  const { user, getUser } = useUser();
  useEffect(function () {
    getUser();
  }, []);
  useEffect(
    function () {
      if (hasJoined.current) return;
      socket.emit("join-room", { projectId });
      hasJoined.current = true;
    },
    [projectId, socket]
  );
  function handleMessageReceived(data) {
    // console.log("message received", data);
    setMessages((curr) => [
      ...curr,
      { username: data.username, content: data.content, senderId: data.userId },
    ]);
  }
  useEffect(
    function () {
      socket.on("receive-message", handleMessageReceived);
      return () => {
        socket.off("receive-message", handleMessageReceived);
      };
    },
    [socket]
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // setMessages([...messages, { id, user: "", message: input }]);
      // console.log(input);
      socket.emit("send-message", {
        roomId: projectId,
        userId: user._id,
        username: user.firstName,
        content: input,
      });
      setInput("");
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-full h-full rounded-lg p-6 relative overflow-hidden flex flex-col justify-between">
        <div className="title text-center font-medium text-lg text-gray-200">
          ProjectNest
        </div>
        <div className="header flex justify-between mt-5">
          <OverlappingProfiles />
          <div className="audionvideo flex gap-10 text-accent mx-4">
            <span className="name">
              <IoCall className="text-xl" />
            </span>
            <span className="name">
              <FaVideo className="text-xl" />
            </span>
          </div>
        </div>
        <ReactScrollToBottom className="messagebox w-full h-5/6 overflow-y-scroll p-4 ">
          {messages.map((item, i) => (
            <StdChatMessage
              key={i}
              senderId={item.senderId}
              userName={item.username}
              content={item.content}
              classs={item.senderId === user._id ? "right" : "left"}
              currentUserId={user._id}
            />
          ))}
        </ReactScrollToBottom>
        <div className="footer w-full h-fit flex gap-3 mt-4">
          <span className="link text-xl cursor-pointer">
            <HiMiniLink className="text-accent font-bold mt-2" />
          </span>
          <form className="flex w-full" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="message"
              className="rounded-md h-9 w-full flex-grow p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-white text-xl">
              <IoIosSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
