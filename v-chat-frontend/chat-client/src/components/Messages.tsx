import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

interface MessageText {
  user?: string;
  text?: string;
}

interface Props {
  messages: MessageText[];
  name: string;
}

const Messages = ({ messages, name }: Props) => {
  return (
    <ScrollToBottom className="overflow-auto flex-auto">
      {messages.map((message, index) => (
        <Message key={index} message={message} name={name} />
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
