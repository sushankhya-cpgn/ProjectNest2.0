import { useEffect, useState } from "react";
import { useSocket } from "../../contexts/socketContext";
import { useNavigate, useSearchParams } from "react-router-dom";
function Setting() {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");
  const [currentUser, setCurrentUser] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [inputs, setInputs] = useState({ username: "", roomId: "" });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs((curr) => ({ ...curr, [name]: value }));
  }

  function handleNewUserJoined(data) {
    console.log(data);
    setCurrentUser(data.username);
    navigate(`?room=${data.roomId}`);
  }

  function handleNewMessageSent(data) {
    setRoomMessages((curr) => [...curr, data]);
  }

  useEffect(
    function () {
      socket.on("room-joined", handleNewUserJoined);
      socket.on("message-sent", handleNewMessageSent);
      return () => {
        socket.off("room-joined", handleNewUserJoined);
        socket.off("message-sent", handleNewMessageSent);
      };
    },
    [socket]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (
      inputs.username.trim().length === 0 ||
      inputs.roomId.trim().length === 0
    )
      return;
    socket.emit("join-room", {
      roomId: inputs.roomId,
      username: inputs.username,
    });
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  function handleSendMessage(e) {
    e.preventDefault();
    socket.emit("send-message", {
      username: currentUser,
      message,
      roomId,
    });
    setMessage("");
  }
  console.log(roomMessages);

  if (roomId) {
    return (
      <div>
        <div>
          <h1>welcome to room</h1>
          <span>Id: {roomId}</span>
        </div>
        <div className="h-56 overflow-auto p-2">
          {/* <div className="flex justify-end"> */}
          {roomMessages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.username === currentUser && "justify-end"
              }`}
            >
              <div>
                {message.username !== currentUser && (
                  <span>{message.username}: </span>
                )}
                <span>{message.message}</span>
              </div>
            </div>
          ))}
          {/* <div>
              <span>hello</span>
            </div> */}
          {/* </div> */}
        </div>
        <form className="p-2 flex" onSubmit={handleSendMessage}>
          <input
            className="text-black w-full"
            value={message}
            onChange={handleMessageChange}
          ></input>
          <button className="ring-2">Send</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div>Settings</div>
      <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
        <div className="flex gap-3">
          <input
            onChange={handleInputChange}
            value={inputs.username}
            name="username"
            className="w-1/2 p-2 text-background"
            type="text"
            placeholder="username"
          />
          <input
            onChange={handleInputChange}
            value={inputs.roomId}
            name="roomId"
            className="w-1/2 p-2 text-background"
            type="text"
            placeholder="room id"
          />
        </div>
        <button className="w-full p-2 bg-yellow-900 hover:bg-slate-800">
          Join Room
        </button>
      </form>
    </>
  );
}
export default Setting;
