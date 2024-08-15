import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import MessageForm from '../components/MessageForm';
import MessageComponent from '../components/Message';
import ExpandedMessage from '../components/ExpandedMessage';
import { Message } from '../types';
import BackButton from '../components/BackButton';

const Prompt = styled(motion.div)`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  z-index: 1000;
  width: 90%;
  max-width: 800px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}80, ${props => props.theme.colors.accent}80);
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

const BoardWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #d4a76a;
  background-image: 
    repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 51px),
    repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 51px);
  padding: 2rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const AddButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1002;

  &::before {
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: rotate(90deg);
  }
`;

const MessageBoard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState<Message | null>(null);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(savedMessages);
    const timer = setTimeout(() => setShowPrompt(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getRandomColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  };
  
  const addMessage = async (formData: FormData) => {
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;
    let imageDataUrl = '';

    if (imageFile) {
      imageDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageFile);
      });
    }

    const newMessage: Message = {
      content,
      image: imageDataUrl,
      initialX: parseFloat(formData.get('initialX') as string),
      initialY: parseFloat(formData.get('initialY') as string),
      color: getRandomColor(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setShowForm(false);
  };

  const updateMessagePosition = (index: number, x: number, y: number) => {
    const updatedMessages = [...messages];
    updatedMessages[index] = { ...updatedMessages[index], initialX: x, initialY: y };
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  return (
    <BoardWrapper>
      <BackButton />
      <AnimatePresence>
  {showPrompt && (
    <Prompt
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      Fill this page with moments and memories of your friend !
    </Prompt>
  )}
</AnimatePresence>
{messages.map((message, index) => (
  <MessageComponent
    key={index}
    {...message}
    onExpand={() => setExpandedMessage(message)}
    onDragEnd={(x: number, y: number) => updateMessagePosition(index, x, y)}
  />
))}
      <AddButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowForm(true)}
      >
        +
      </AddButton>
      {showForm && <MessageForm onSubmit={addMessage} onClose={() => setShowForm(false)} />}
      <AnimatePresence>
        {expandedMessage && (
          <ExpandedMessage
            {...expandedMessage}
            onClose={() => setExpandedMessage(null)}
          />
        )}
      </AnimatePresence>
    </BoardWrapper>
  );
};

export default MessageBoard;