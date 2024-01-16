import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
});

// const socket = io("http://localhost:3001"); // Update with your server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Listen for incoming chat messages
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up event listeners when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("yahan a raha ", inputMessage);

    if (inputMessage) {
      console.log("yahan ander a jao", inputMessage);

      // Emit the chat message to the server
      socket.emit("chat message", inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
