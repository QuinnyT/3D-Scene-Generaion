import React, { useRef, useState } from 'react';
import { iconsList, IconInfoProps } from "@/assets/icons/myicons";

import Divider from '@mui/material/Divider'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import { TextInput, TextArea } from "../../../components/custom-text"
import { OutlineButton, ContainedButton, CustomChip } from "../../../components/custom-use-theme";
import CircularProgress from '@mui/material/CircularProgress';

import ShowingBox from "@/components/showing-box";

// import axios from "axios";
// import JSON5 from "json5" 

import { UserContent, StoryContent, MessageType, StoryType } from "@/lib/messages/types"

interface ChipState {
  seletedChip: string | null;
  changeSelectedChip: (chipLabel: string) => void;
}


const storyElements: string[] = [];

interface ChatProps {
  sender: string;
  content: string | UserContent;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>, value: string | StoryType) => void;
}

const Chat: React.FC<ChatProps & LoadingState & ChipState> = ({ sender, content, outlineLoading, setOutlineLoading, handleSubmit, seletedChip, changeSelectedChip }) => {

  const [inputValue, setInputValue] = useState(''); 
  const [isEditing, setIsEditing] = useState(true); 
  const questionIndex = (content as UserContent).questionIndex;
  const seletableChip = (content as UserContent).seletableChip;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  function submitThis(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if( questionIndex <= 2 && inputValue == '' ) return;
    
    storyElements.push(inputValue);
    if(handleSubmit) {
      handleSubmit(e, inputValue);
    }
    setIsEditing(false);
  }
  
  function handleClick(e: React.MouseEvent<HTMLDivElement>, chipLabel: string) {
    storyElements.push(chipLabel);
    if(handleSubmit) {
      handleSubmit(e, chipLabel);
    }
    setIsEditing(false);
    setInputValue(chipLabel);
    changeSelectedChip(chipLabel);
  }

  async function generateStory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("storyElements", storyElements)
    setOutlineLoading(true);
    // const res = await axios.post("http://localhost:3030/getstory", {
    //   content : {
    //     audience: storyElements[0],
    //     purpose: storyElements[1],
    //     type: storyElements[2],
    //   }
    // })
    // console.log("res", res);
    // let generatedContent: StoryType;
    // if(res.data.choices) generatedContent = JSON5.parse(res.data.choices[0].message.content);
    // else generatedContent = JSON5.parse(res.data.message.content);

    setOutlineLoading(false);
    
    if(handleSubmit) {
      // handleSubmit(e, generatedContent);
      handleSubmit(e, inputValue);
    }
    setIsEditing(false);


  }

  let chipContent = null;
  if (seletableChip && isEditing) {
    chipContent = (
      <div className='w-[90%] h-20 mt-5'>
        <div className='text-sm text-[#ACACAC]'>以下是一些建议:</div>
        <div className='p-2 gap-x-2 flex'>
          {(seletableChip as string[]).map((chipLabel: string) => {
            const iconInfo = iconsList.find((item: IconInfoProps) =>item.label === chipLabel)
            return (
              <CustomChip
                key={chipLabel}
                label={<div className='flex'>
                         {iconInfo !== undefined && (<img src={iconInfo?.icon} width='20' height='20' className="mr-1" alt="" />)}
                         <span>{chipLabel}</span>
                       </div>}
                variant={seletedChip === chipLabel ? "filled" : "outlined"}
                onClick={(e) => handleClick(e, chipLabel) }/>)
          })}
        </div>
      </div>
    )
  }

  return (
      <>
        {sender == "robot" && (
          <div className="mt-2 flex justify-start items-center">
            <div className='bg-[#263530]/90 rounded-2xl p-4 min-h-14 max-w-[80%] text-wrap'>
              {content as string}
            </div>
          </div>)
        }
        {sender == "user" && questionIndex <= 3 && (
          <div className="mt-2 flex justify-end items-center">
            <div className='bg-[#263530]/90 rounded-2xl p-4 min-h-10 w-[35rem] flex flex-wrap'>

              {( questionIndex < 2 || (questionIndex == 2 && !isEditing) ) && 
                <form className='w-[100%] flex items-center my-3' onSubmit={(e) => submitThis(e) }>
                  <div className='w-[100%]'>
                      <TextInput InputProps={{ readOnly: !isEditing }} placeholder={(content as UserContent).placeholder} value={inputValue} onChange={handleChange} />
                  </div>
                  <div className='ml-2'>
                    <ContainedButton type="submit" style={{ height: '3.2rem', width: '2rem', display: isEditing ? 'flex' : 'none' }}>发送</ContainedButton>
                  </div>
                </form>
              }
              {questionIndex == 3 && 
                <form className='w-[100%] h-[12rem] flex flex-col items-center my-5' onSubmit={(e) => generateStory(e) }>
                  <div className='w-[30rem]'>
                    <TextArea rows={5} placeholder={(content as UserContent).placeholder} value={inputValue} onChange={handleChange}/>
                  </div>
                  <div className='mt-4'>
                    <ContainedButton type="submit" style={{ height: '2.2rem', width: '30rem'}} endIcon={outlineLoading ? <CircularProgress size={16} sx={{ color: '#295444'}} /> : null} >生成故事大纲</ContainedButton>
                  </div>
                </form>
              }
              {chipContent}
              
            </div>
          </div>
        )
        }
      </>
  
    
  );
};

interface StoryOutlineProps {
  content: StoryContent;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>, value: string | StoryType) => void;
}

const StoryOutline: React.FC<StoryOutlineProps & LoadingState & ChipState> = ({ content, outlineLoading, setOutlineLoading, handleSubmit, seletedChip, changeSelectedChip }) => {
  const [isGood, setIsGood] = useState(false);
  const [isBad, setIsBad] = useState(false);
  const [storyLoading, setStoryLoading] = useState(false);
  const thumbRef = useRef(null);
  
  const [showingBoxOpen, setShowingBoxOpen] = useState(false);
  const [animationName, setAnimationName] = useState('');

  const seletableChip = content.seletableChip;
  
  function setEvaluation(event: React.MouseEvent, state: string) {
    event.stopPropagation();
    if(state == "good") {
      setIsGood(true);
      setIsBad(false);
    }
    else if(state == "bad") {
      setIsGood(false);
      setIsBad(true);
    }
  }

  function clickForm(event: React.MouseEvent) {
    if( (event.target as Node) !== thumbRef.current ) {
      setIsGood(false);
      setIsBad(false);
    }
  }

  async function resetOutline(e: React.MouseEvent<HTMLButtonElement>) {
    setOutlineLoading(true);
    
    // const res = await axios.post("http://localhost:3030/getstory", {
    //   content : {
    //     audience: storyElements[0],
    //     purpose: storyElements[1],
    //     type: storyElements[2],
    //   }
    // })
    // let generatedContent: StoryType;
    // if (res.data.choices)
    //   generatedContent = JSON5.parse(res.data.choices[0].message.content);
    // else
    //   generatedContent = JSON5.parse(res.data.message.content);
    
    if(handleSubmit) {
      // handleSubmit(e, generatedContent);
      handleSubmit(e, "reset");
    }
    
    setOutlineLoading(false);
  }

  function generateAnimation() {
    setStoryLoading(true);
    setTimeout( async () => {
      setStoryLoading(false);

      // const res = await axios.post("http://localhost:3030/getanimation", {
      //   outline: (content as StoryContent).outline
      // })
      // console.log("animation", res.data.choices[0])
      // setAnimationName(res.data.choices[0].message.content);
      setAnimationName("Talking");

      setShowingBoxOpen(true);
      // setDialogOpen(true);
      // setSnackbarOpen(true);
      // window.open("http://localhost:8000?openstory=true#/Home");
    }, 2000); 
  }

  function closeShowingBox() {
    setShowingBoxOpen(false)
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>, chipLabel: string) {
    storyElements.push(chipLabel);
    if(handleSubmit) {
      handleSubmit(e, chipLabel);
    }
    changeSelectedChip(chipLabel);
  }

  return (
    <>
      <form onClick={clickForm} className="mt-20 flex justify-center items-center overflow-hidden">
      <div className='bg-[#263530]/90 rounded-2xl p-4 min-h-14 w-[40rem] h-[55rem] flex-col'>
        <div className='w-[100%] h-[8%] mt-2 flex items-center justify-between'>
          <div className=' text-2xl font-bold'>生成你的故事</div>
          <div className='flex gap-x-2'>
            <OutlineButton style={{ height: '2rem', width:'6rem' }} onClick={(e) => resetOutline(e)} endIcon={outlineLoading ? <CircularProgress size={16} sx={{ color: '#295444'}} /> : null}>{outlineLoading ? '' : '再试一次'}</OutlineButton>
            <ContainedButton style={{ height: '2rem', width:'8rem' }} onClick={generateAnimation} endIcon={storyLoading ? <CircularProgress size={16} sx={{ color: '#295444'}} /> : null}>{storyLoading ? '生成中' : '生成这个故事'}</ContainedButton>
          </div>
        </div>
        <Divider sx={{ backgroundColor: '#AFAFAF' }}/>
        <div className='w-[100%] h-[8%] mt-2'>
          <div className='text-sm text-[#B0B0B0]'>故事类型</div>
          <div className='p-2 gap-x-2 flex'>
            {(seletableChip as string[]).map((chipLabel: string) => (
              <CustomChip
                key={chipLabel}
                style={{ color: 'white' }}  
                label={<div className='flex'>
                         <img src={iconsList.find((item: IconInfoProps) =>item.label === chipLabel)?.icon} width='20' height='20' className="mr-1" alt="" /> <span>{chipLabel}</span>
                       </div>}
                variant={seletedChip === chipLabel ? "filled" : "outlined"}
                onClick={(e) => handleClick(e, chipLabel) } />
            ))}
          </div>
        </div>
        <div className='w-[100%] h-[22%] mt-2'>
          <div className='text-sm text-[#B0B0B0]'>故事人物</div>
          <div className='p-1 flex items-center'>
            <TextInput style={{width: "12rem"}} placeholder="名字" value={(content as StoryContent).characters[0].name} />
            <TextArea rows={2} style={{width: "24rem", marginLeft: '1rem'}} placeholder="介绍" value={(content as StoryContent).characters[0].description} />
          </div>
          <div className='p-1 flex items-center'>
            <TextInput style={{width: "12rem"}} placeholder="名字" value={(content as StoryContent).characters[1].name}/>
            <TextArea rows={2} style={{width: "24rem", marginLeft: '1rem'}} placeholder="介绍" value={(content as StoryContent).characters[1].description} />
          </div>
        </div>
        <div className='w-[100%] h-[50%] mt-2'>
          <div className='text-sm text-[#B0B0B0]'>故事大纲</div>
          <TextArea rows={15}  style={{width: "37rem", margin: '0.5rem' }} placeholder="故事内容" value={(content as StoryContent).outline}/>
          <div ref={thumbRef} className='text-sm text-[#B0B0B0] flex items-center gap-x-1'>
            你觉得这个故事怎么样？
            <span><ThumbUpAltIcon style={{ color: isGood ? '#5AB091' : 'white', cursor: 'pointer' }} onClick={(e: React.MouseEvent) => setEvaluation(e, "good")} fontSize="small"/></span>
            <span><ThumbDownAltIcon  style={{ color: isBad ? 'red' : 'white', cursor: 'pointer' }}  onClick={(e: React.MouseEvent) => setEvaluation(e, "bad")} fontSize="small"/></span>
          </div>
        </div>
        <div className='w-[100%] h-[8%] mt-2 flex items-center justify-end'>
          <div className='flex gap-x-2'>
            {/* <Button style={{ height: '2rem', width:'6rem', color: "#fff", outlineColor: "#fff" }} sx={{ borderColor: '#ACACAC' }} color='themecolor' variant="outlined">再试一次</Button> */}
            <OutlineButton style={{ height: '2rem', width:'6rem' }} onClick={resetOutline} endIcon={outlineLoading ? <CircularProgress size={16} sx={{ color: '#295444'}} /> : null}>{outlineLoading ? '' : '再试一次'}</OutlineButton>
            <ContainedButton style={{ height: '2rem', width:'8rem' }} onClick={generateAnimation} endIcon={storyLoading ? <CircularProgress size={16} sx={{ color: '#295444'}} /> : null}>{storyLoading ? '生成中' : '生成这个故事'}</ContainedButton>
            
          </div>
        </div>
      </div>
      </form>
      <ShowingBox isOpen={showingBoxOpen} closeShowingBox={closeShowingBox} animationName={animationName} />
    </>

  )
}


interface MessageProps {
  message: MessageType;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>, value: string | StoryType) => void;
}

interface LoadingState {
  outlineLoading: boolean;
  setOutlineLoading: (isLoading: boolean) => void;
}

const Message: React.FC<MessageProps & LoadingState & ChipState> = ({ message, ...props }) => {
  return (
    <>
      {message.sender == "user" && (message.content as StoryContent).isFinal ? (
        <StoryOutline 
          content={message.content as StoryContent}
          {...props}
        />
      ) : (
        <Chat 
          sender={message.sender}
          content={message.content as (string | UserContent)}
          {...props}
        />
      )}
    </>
  )
};


export default Message;