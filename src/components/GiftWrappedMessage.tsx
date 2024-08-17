import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import MessageComponent from './Message';
import { Message } from '../types';

const GiftContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 220px;
  height: 220px;
`;

const Gift = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

const GiftCover = styled(motion.div)`
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.colors.primary};
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const GiftWrap = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 40px;
  background-color: ${props => props.theme.colors.accent};
  left: 50%;
  transform: translateX(-50%);

  &::before, &::after {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    box-shadow: inset 0 0 0 10px ${props => props.theme.colors.accent};
    border-radius: 50%;
    height: 40px;
    width: 100px;
  }

  &::before {
    left: -30px;
    transform: rotate(-35deg);
  }

  &::after {
    right: -30px;
    transform: rotate(35deg);
  }
`;

const GiftBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  height: 80%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 20px;
  }
`;

const GiftWrappedMessage: React.FC<{
    message: Message;
    isRevealed: boolean;
    onReveal: () => void;
    onExpand: () => void;
    onDragEnd: (x: number, y: number) => void;
  }> = ({ message, isRevealed, onReveal, onExpand, onDragEnd }) => {
    const [isWobbling, setIsWobbling] = useState(false);
    const [isUnwrapping, setIsUnwrapping] = useState(false);
  
    const handleClick = () => {
      if (!isRevealed && !isUnwrapping) {
        setIsWobbling(true);
        setTimeout(() => {
          setIsWobbling(false);
          setIsUnwrapping(true);
          setTimeout(() => {
            onReveal();
          }, 1000);
        }, 500);
      }
    };
  
    const wobbleAnimation = {
      rotate: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    };
  
    const unwrapAnimation = {
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 1 }
    };
  
    return (
      <AnimatePresence>
        {!isRevealed ? (
          <GiftContainer
            onClick={handleClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 360 }}
            transition={{ duration: 0.5 }}
            style={{ x: message.initialX, y: message.initialY }}
          >
            <Gift 
              animate={isWobbling ? wobbleAnimation : isUnwrapping ? unwrapAnimation : {}}
            >
              <GiftCover
                animate={isWobbling ? wobbleAnimation : {}}
                exit={{ y: -1000, rotate: 20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GiftWrap />
              </GiftCover>
              <GiftBox 
                exit={{ y: '150%', opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </Gift>
          </GiftContainer>
        ) : (
          <MessageComponent
            {...message}
            onExpand={onExpand}
            onDragEnd={onDragEnd}
          />
        )}
      </AnimatePresence>
    );
  };

export default GiftWrappedMessage;