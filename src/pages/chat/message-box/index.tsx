import { useState, useEffect, useRef } from 'react';

// import MessageList from './message-list';
import Message from './messages';
import { MessageType, StoryType } from "@/lib/messages/types"
import { defaultMessages, getRobotMessages, getUserMessage } from "@/lib/messages/get-demo-messages";
// import MessageInput from './message-input';

// function handleSubmit() {
  
// }

// bg-[#141615]

const MessageBox = () => {

  const [messages, setMessages] = useState<MessageType[]>(defaultMessages);

  const updateMessages = (newMessage: string | StoryType, questionIndex: number) => {
    if (questionIndex <= 2) {
      const robotMessages = getRobotMessages(newMessage, messages.length, questionIndex);
      const userMessage = getUserMessage(newMessage, messages.length + 2, questionIndex);
      const newMessagesList = [...messages, ...robotMessages, userMessage];
      setMessages(newMessagesList);
    } else if (questionIndex === 3) {
      const storyMessage: MessageType = getUserMessage(newMessage, messages.length, questionIndex);
      const newMessagesList = [...messages, storyMessage];
      setMessages(newMessagesList);
    } else if (questionIndex == 4) {
      const regenerateStoryMessage: MessageType = getUserMessage(newMessage, messages.length - 1, questionIndex);
      const newMessagesList = messages.map((orginalMessage, index) => {
        if (index === messages.length - 1) 
          return regenerateStoryMessage;
        else 
          return orginalMessage;
      });
      setMessages(newMessagesList);
    }
  };

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [seletedChip, setSeletedChip] = useState< string | null >(null);
  const [outlineLoading, setOutlineLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>, value: string | StoryType) => {
    event.preventDefault();
    updateMessages(value, questionIndex);
    if(questionIndex <= 3) setQuestionIndex(questionIndex + 1)
  };

  const changeSelectedChip = (chipLabel: string) => {
    setSeletedChip(chipLabel)
  }

  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  return (
    <div className='bg-chat-bg bg-no-repeat bg-center bg-cover text-[#fff] '>
      <div className='w-[100vw] h-[100vh] flex flex-col items-center content-end py-10'>
        <div className='w-[60%] flex-col overflow-y-auto' ref={messagesRef}>
            {messages.map((message, index) => (
              <Message 
                key={index}
                message={message}
                handleSubmit={handleSubmit}
                seletedChip={seletedChip}
                changeSelectedChip={changeSelectedChip}
                outlineLoading={outlineLoading}
                setOutlineLoading={setOutlineLoading}
              />
            ))}
        </div>
      </div>
      {/* <MessageList messages={messages} updateMessages={updateMessages} /> */}
    </div>
  );
};

export default MessageBox;
