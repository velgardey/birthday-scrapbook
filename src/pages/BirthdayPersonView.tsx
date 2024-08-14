import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MessageComponent from '../components/Message';
import { Message } from '../types';
import BackButton from '../components/BackButton';
import ExpandedMessage from '../components/ExpandedMessage';

const ViewWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #d4a76a;
  background-image: 
    repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 51px),
    repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 51px);
  padding: 2rem;
  box-sizing: border-box;
`;

const ResetButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BirthdayPersonView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedMessage, setExpandedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(savedMessages);
  }, []);

  const resetBoard = () => {
    localStorage.removeItem('messages');
    setMessages([]);
  };

  return (
    <ViewWrapper>
      <BackButton />
      {messages.map((message, index) => (
        <MessageComponent 
          key={index} 
          {...message} 
          image={message.image}
          onExpand={() => setExpandedMessage(message)}
        />
      ))}
      <ResetButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetBoard}
      >
        Reset Board
      </ResetButton>
      {expandedMessage && (
        <ExpandedMessage
          {...expandedMessage}
          onClose={() => setExpandedMessage(null)}
        />
      )}
    </ViewWrapper>
  );
};

export default BirthdayPersonView;