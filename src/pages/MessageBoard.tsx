import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import MessageForm from '../components/MessageForm';
import MessageComponent from '../components/Message';
import ExpandedMessage from '../components/ExpandedMessage';
import { Message } from '../types';
import BackButton from '../components/BackButton';

const BoardWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url('/cork-board-texture.jpg') repeat;
  padding: 2rem;
  box-sizing: border-box;
`;

const AddButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const MessageBoard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(savedMessages);
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
  return (
    <BoardWrapper>
      <BackButton />
      {messages.map((message, index) => (
        <MessageComponent
          key={index}
          {...message}
          onExpand={() => setExpandedMessage(message)}
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