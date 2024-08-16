
// import {
//   MinChatUiProvider,
//   MainContainer,
//   MessageInput,
//   MessageContainer,
//   MessageList,
//   MessageHeader,
// } from "@minchat/react-chat-ui";
import MessageBox from "./message-box";

export const ChatBox = () => {
  
  return (
    // <MinChatUiProvider theme="#6ea9d7">
    //   <MainContainer >
    //     <MessageContainer>
    //       <MessageHeader />
    //       <MessageList
    //         currentUserId='dan'
    //         messages={[{
    //           text: 'Hello',
    //           user: {
    //             id: 'mark',
    //             name: 'Markus',
    //           },
    //         }]}
    //       />
    //       <MessageInput showSendButton placeholder="Type message here" />
    //     </MessageContainer>
    //   </MainContainer>
    // </MinChatUiProvider>
    <div>
      <img src="/UI_logo.png" alt="Parametrix" className='absolute top-5 left-5 w-40' />
      <MessageBox ></MessageBox>
    </div>
  )
}