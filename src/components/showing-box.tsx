import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import ThreeJsArea from '@/pages/chat/threejs-area';

interface CustomDialogProps{
  isOpen: boolean;
  closeShowingBox: () => void;  // 关闭Dialog时将状态的改变的提升到父组件中，而Snackbar不能提升（自动关闭时会触发）
  animationName?: string;  // 在 Character 组件中会用到的参数
}
const CustomDialog: React.FC<CustomDialogProps> = ({ isOpen, closeShowingBox }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentSize, setContentSize] = useState({width: 0, height: 0})
  useEffect(() => {
    setDialogOpen(isOpen);
    setTimeout(() => {
      setContentSize({width: Number(contentRef.current?.offsetWidth), height: Number(contentRef.current?.offsetHeight)})
    }, 300);
  }, [isOpen])

  
  function handleCloseDialog(event: React.MouseEvent | React.KeyboardEvent, reason: string) {
      console.log("reason", reason)
      if (reason == 'escapeKeyDown') {
        setDialogOpen(false);
        closeShowingBox();
      }
    }
  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth='lg' fullWidth>
      <DialogTitle id="alert-dialog-title">
        剧情展示
      </DialogTitle>
      <DialogContent>
        <div className='h-[40rem]' ref={contentRef}>
          {/* <img src="/story.jpg" alt="" /> */}
          {/* <ThreeJsArea animationName={animationName} width={contentSize.width} height={contentSize.height}/> */}
          <ThreeJsArea width={contentSize.width} height={contentSize.height}/>
        </div>
      </DialogContent>
    </Dialog>
  );
};


interface CustomSnackbarProps{
  isOpen: boolean;
}
const CustomSnackbar: React.FC<CustomSnackbarProps> = ({isOpen}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    setSnackbarOpen(isOpen)
  }, [isOpen])

  function handleCloseSnackbar(event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  }
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
    >
      <SnackbarContent 
      sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: 'none', fontSize: '1.2rem' }}
        message={
          "按 Esc 关闭展示"
        }
      />
    </Snackbar>
  );
};


interface ShowingBoxProps {
  isOpen: boolean;
  closeShowingBox: () => void;
  animationName: string;
}

const ShowingBox: React.FC<ShowingBoxProps> = ({isOpen, closeShowingBox, animationName}) => {

    return (
    <>
      <CustomDialog isOpen={isOpen} closeShowingBox={closeShowingBox} animationName={animationName} />
      <CustomSnackbar isOpen={isOpen} />
    </>
  );
}


export default ShowingBox;