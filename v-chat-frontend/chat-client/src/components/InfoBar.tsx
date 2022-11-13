import DropdownMenu from "./DropdownMenu";
import { MdClose } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { User } from "../types";

interface Props {
  room: string;
  users: User[];
}

const InfoBar = ({ room, users }: Props) => {
  return (
    <div className="flex flex-wrap-reverse justify-between items-center bg-blue-500 py-4 border-black border-b-4 px-5 w-full sm:border-b-[6px]">
      <div className="flex flex-wrap items-center">
        <BsCircleFill className="h-full mt-[2px] text-lg text-green-400 mr-4 rounded-full border-2 border-black" />
        <p className="h-full text-3xl font-display text-white font-semibold sm:text-4xl">
          {room}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-self-end">
        <DropdownMenu users={users} />
        <Link
          to="/"
          className="text-2xl hover:cursor-pointer text-black sm:text-4xl focus:outline-none focus:ring focus:ring-white hover:text-white"
        >
          <MdClose />
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;
