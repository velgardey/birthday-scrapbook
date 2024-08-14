import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import MessageComponent from '../components/Message';
import { Message } from '../types';
import BackButton from '../components/BackButton';
import ExpandedMessage from '../components/ExpandedMessage';

const WelcomeMessage = styled(motion.div)`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  z-index: 1000;
  width: 90%;
  max-width: 800px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.6);
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


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
  width: 60px;
  height: 60px;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;

  &::before {
    content: '↺';
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: rotate(180deg);
  }
`;

const BirthdayPersonView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedMessage, setExpandedMessage] = useState<Message | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(savedMessages);
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const resetBoard = () => {
    localStorage.removeItem('messages');
    setMessages([]);
  };

  return (
    <ViewWrapper>
      <BackButton />
      <AnimatePresence>
        {showWelcome && (
          <WelcomeMessage
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            Happy Birthday! Check out the messages and moments your friends sent you!
          </WelcomeMessage>
        )}
      </AnimatePresence>
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
        aria-label="Reset Board"
      />
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