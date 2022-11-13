import React, { useState, useEffect, FormEvent } from "react";
import { useSearchParams, Navigate, Route } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import InfoBar from "./InfoBar";
import InputBar from "./InputBar";
import Messages from "./Messages";
import { User } from "../types";

const ENDPOINT =
  "http://chatserver-env.eba-2tn7qivb.us-east-1.elasticbeanstalk.com/";
let socket: Socket;

interface MessageText {
  user?: string;
  text?: string;
}

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageText[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const nameParam = searchParams.get("name");
    const roomParam = searchParams.get("room");
    socket = io(ENDPOINT);
    if (nameParam) setName(nameParam);
    if (roomParam) setRoom(roomParam);
    socket.emit(
      "join",
      { name: nameParam, room: roomParam },
      (error: { error: string }) => {
        if (error) {
          setIsError(true);
        }
      }
    );
    return () => {
      socket.emit("leaveChat");
      socket.disconnect();
    };
  }, [searchParams]);

  useEffect(() => {
    socket.on("message", (message: MessageText) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return isError ? (
    <Route element={<Navigate to="/" />} />
  ) : (
    <div className="flex justify-center items-center h-screen w-full bg-green-400">
      <div className="flex flex-col justify-between relative w-full bg-white h-full border-4 border-black sm:mx-3 sm:h-5/6 sm:shadow-solid-lg sm:max-w-screen-sm sm:border-[6px]">
        <InfoBar room={room} users={users} />
        <Messages messages={messages} name={name} />
        <InputBar
          setMessage={setMessage}
          message={message}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
