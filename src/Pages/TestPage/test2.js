import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
});

// const socket = io("http://localhost:3001"); // Update with your server URL

function App() {
  const [messages, setMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState("");
  const [username, setUserName] = useState("");
  useEffect(() => {
    socket.on("UserList", (arg) => {
      console.log("arg", arg);
    });
    socket.on("chatMessage", (msg) => {
      console.log("arg", msg);
      setMessages(msg);
    });
    // Listen for incoming chat messages
    // socket.on("getUsers", (msg) => {
    //   console.log("users", msg);
    //   // setMessages((prevMessages) => [...prevMessages, msg]);
    // });

    // return () => {
    //   socket.disconnect ();
    // };
  }, []);

  const handleSubmit = (e) => {
    console.log("yahan a raha ", inputMessage);

    if (inputMessage) {
      // Emit the chat message to the server
      socket.emit("sendMessage", inputMessage);
      setInputMessage("");
    }
  };
  const handleAddUser = (e) => {
    if (username) {
      // Emit the chat message to the server
      socket.emit("setUsername", username);
      // setUserName("");
    }
  };
  return (
    <div>
      {/* <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul> */}

      <div className="border border-gray-300 p-3 flex space-x-3">
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <button onClick={() => handleAddUser()}>Send User</button>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form> */}
      <div className="border flex flex-col border-gray-600  flex  h-96 mt-3 rounded-md justify-between overflow-hidden">
        <div className="p-3">
          <div>
            {messages?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col"
                style={{
                  textAlign: item.username === username ? "right" : "left",
                }}
              >
                <div className="">
                  <a className="border rounded-full border-gray-600 px-1">
                    {item.username.charAt(0)}
                  </a>{" "}
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full flex flex-row">
          <input
            placeholder="Write Message here"
            className="h-8 w-full px-3 outline-none"
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
          />
          <button
            onClick={() => handleSubmit()}
            className="px-4 bg-green-400 text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

const data = [
  {
    message: "helo bhai g",
    username: "Ali",
  },
  {
    message: "helo bhai g",
    username: "Zain",
  },
  {
    message: "helo bhai g",
    username: "Zain",
  },
  {
    message: "helo bhai g",
    username: "Ali",
  },
];
