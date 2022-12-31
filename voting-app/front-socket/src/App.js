import React, { useState, useEffect } from "react";
import './App.css';
import { io }  from "socket.io-client";

const SERVER_SOCKET_URL = process.env?.REACT_APP_SERVER_SOCKET_URL ?? ''

console.info('Env: SERVER_SOCKET_URL', SERVER_SOCKET_URL)

const socket = io(SERVER_SOCKET_URL, {
  path: `/socket.io`,
});


function App() {
  const [status, setStatus] = useState("waiting from socket");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {

    socket.on('connect', () => {
      setStatus(`client is connect`);
    });
    socket.on('connect_error', ()=>{
      setTimeout(() => socket.connect(),5000)
    })
    socket.on('disconnect', () => {
      setStatus("client is disconnect");
    });

    socket.on("socket-message", data => {
      console.info('Receive a message From socket', data)
      if (data) {
        setCandidates(JSON.parse(data));
      }
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('socket-message');
    };

  }, []);

  return (
      <div className="root">
        <h4 className="color">
          {status}, {!candidates.length && <strong>waiting for server ....</strong>}
        </h4>
        <div className="vote-flex">
          {candidates?.map((candidate, index) =>
              <div key={`vote-item-${index}`} className="vote-flex vote">
                <div className="vote-candidate">{candidate.candidate}</div>
                <div className="vote-count">{candidate.count}</div>
              </div>
          )}
        </div>
      </div>
  )
}

export default App;