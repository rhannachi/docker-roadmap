import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const SERVER_SOCKET_URL = process.env.REACT_APP_SERVER_SOCKET_URL
const socket = io(SERVER_SOCKET_URL, { transports: ['websocket'] });

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {

    socket.on("socket-message", data => {
      console.info('Receive a message From socket', data)
      setResponse(data);
    });

    socket.on('connect', () => {
      setResponse("client is connect");
    });
    socket.on('connect_error', ()=>{
      setTimeout(() => socket.connect(),5000)
    })
    socket.on('disconnect', () => {
      setResponse("client is disconnect");
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('socket-message');
    };

  }, []);

  return (
      <p>
        Receive a message From socket: <code> {response} </code>
      </p>
  );
}

export default App;