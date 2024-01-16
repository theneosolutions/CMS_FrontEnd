import React, { useEffect, useRef } from "react";
import SockJsClient from "react-stomp";

const MyWebSocketComponent = () => {
  const clientRef = useRef(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected");
    };

    const handleDisconnect = () => {
      console.log("Disconnected");
    };

    const handleMessage = (msg) => {
      console.log(msg);
    };

    const url = "http://c170-182-180-180-51.ngrok-free.app/ws-endpoint";
    const topics = ["/topic/user"];

    const options = {
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
      onMessage: handleMessage,
    };

    clientRef.current = new SockJsClient(url, topics, options);

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      clientRef.current.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return <div>{/* Your component JSX here */}</div>;
};

export default MyWebSocketComponent;
