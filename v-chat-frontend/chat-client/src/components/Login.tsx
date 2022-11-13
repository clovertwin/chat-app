import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="flex items-center justify-center h-screen w-full bg-green-400">
      <div className="flex justify-center items-center w-full bg-blue-500 mx-3 h-5/6 border-4 border-black sm:shadow-solid-lg sm:max-w-screen-sm sm:border-[6px] md:max-w-screen-md md:h-3/5">
        <div className="flex flex-col justify-start w-full px-2 sm:w-3/4 md:w-3/5">
          <h1 className="text-5xl text-white font-display font-bold text-center sm:text-6xl">
            Login
          </h1>
          <input
            type="text"
            placeholder="Name"
            className="border-4 border-black py-2 px-6 placeholder text-2xl text-center mt-10 focus:outline-none focus:ring focus:ring-white"
            onChange={(e) => setName(e.target.value)}
            value={name}
            maxLength={10}
          />
          <input
            type="text"
            placeholder="Room"
            className="mt-5 border-4 border-black py-2 px-6 placeholder text-2xl text-center focus:outline-none focus:ring focus:ring-white"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            maxLength={6}
          />
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
            className="bg-yellow-400 w-full mt-5 py-2 px-6 text-2xl font-bold border-4 border-black rounded-full shadow-solid-sm text-center hover:text-white hover:bg-pink-400 focus:text-white focus:bg-pink-400 focus:outline-none focus:ring focus:ring-white"
          >
            Join Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
