import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '../types';
import BackButton from '../components/BackButton';
import ExpandedMessage from '../components/ExpandedMessage';
import ReactConfetti from 'react-confetti';
import GiftWrappedMessage from '../components/GiftWrappedMessage';

const WelcomeMessage = styled(motion.div)`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  z-index: 1000;
  width: 90%;
  max-width: 700px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  perspective: 1000px;
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
  const [showConfetti, setShowConfetti] = useState(true);
  const [revealedMessages, setRevealedMessages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(savedMessages.map((message: Message) => ({
      ...message,
      reactions: message.reactions || {},
      comments: message.comments || [],
    })));
    const welcomeTimer = setTimeout(() => setShowWelcome(false), 5000);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 10000);
    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const resetBoard = () => {
    localStorage.removeItem('messages');
    setMessages([]);
    setRevealedMessages(new Set());
  };

  const updateMessagePosition = (id: string, x: number, y: number) => {
    const updatedMessages = messages.map(message =>
      message.id === id ? { ...message, initialX: x, initialY: y } : message
    );
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const updateMessage = (updatedMessage: Message) => {
    const updatedMessages = messages.map(message =>
      message.id === updatedMessage.id ? updatedMessage : message
    );
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const handleReveal = (id: string) => {
    setRevealedMessages(prev => new Set(prev).add(id));
  };

  return (
    <ViewWrapper>
      {showConfetti && <ReactConfetti />}
      <BackButton />
      <AnimatePresence>
        {showWelcome && (
          <WelcomeMessage
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            Happy Birthday! Unwrap your messages and moments!
          </WelcomeMessage>
        )}
      </AnimatePresence>
      {messages.map((message, index) => (
        <GiftWrappedMessage
          key={index}
          message={message}
          isRevealed={revealedMessages.has(message.id)}
          onReveal={() => handleReveal(message.id)}
          onExpand={() => setExpandedMessage(message)}
          onDragEnd={(x: number, y: number) => updateMessagePosition(message.id, x, y)}
        />
      ))}
      <ResetButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetBoard}
        aria-label="Reset Board"
      />
      <AnimatePresence>
        {expandedMessage && (
          <ExpandedMessage
            {...expandedMessage}
            onClose={() => setExpandedMessage(null)}
            onUpdateMessage={updateMessage}
          />
        )}
      </AnimatePresence>
    </ViewWrapper>
  );
};

export default BirthdayPersonView;