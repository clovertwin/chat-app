interface MessageText {
  user?: string;
  text?: string;
}

interface Props {
  message: MessageText;
  name: string;
}

const Message = ({ message, name }: Props) => {
  const trimmedName = name.trim().toLowerCase();
  let isSentByCurrentUser = false;

  if (message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="flex justify-end items-center mt-1 mb-4">
      <p className="mr-3 font-semibold text-gray-400">{trimmedName}</p>
      <p className="px-10 font-semibold py-3 mr-3 border-2 border-black bg-green-400 shadow-solid-xs max-w-[70%] break-words rounded-3xl">
        {message.text}
      </p>
    </div>
  ) : (
    <div className="flex justify-start items-center mt-1 mb-4">
      <p className="mr-3 ml-2 font-semibold text-gray-400">{message.user}</p>
      <p className="px-10 font-semibold py-3 bg-orange-300 border-2 border-black shadow-solid-xs max-w-[70%] break-words rounded-3xl">
        {message.text}
      </p>
    </div>
  );
};

export default Message;
