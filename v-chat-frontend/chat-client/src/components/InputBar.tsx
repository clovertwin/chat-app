import { FormEvent } from "react";

interface Props {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  sendMessage: (e: FormEvent) => void;
}

const InputBar = ({ setMessage, message, sendMessage }: Props) => {
  return (
    <form
      onSubmit={(e) => sendMessage(e)}
      className="flex items-center h-20 border-t-4 border-black w-full sm:border-t-[6px]"
    >
      <input
        placeholder="say hey"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-full text-lg font-semibold px-5 w-[70%] text-black focus:outline-none placeholder:text-gray-400 placeholder:italic"
      />
      <button
        type="submit"
        className="h-full text-white border-l-4 border-black text-center bg-blue-500 flex-auto text-2xl font-semibold hover:bg-pink-400 focus:bg-pink-400 focus:text-white focus:outline-none"
      >
        send
      </button>
    </form>
  );
};

export default InputBar;
