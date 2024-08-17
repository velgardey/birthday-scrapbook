import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';
import { Message as MessageType } from '../types';
import { FaMusic } from 'react-icons/fa';


const StyledMessage = styled(motion.div)<{ backgroundColor: string; isDragging: boolean }>`
  position: absolute;
  width: 250px;
  min-height: 300px;
  background-color: white;
  color: #333;
  padding: 15px 15px 40px;
  border-radius: 3px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: move;
  overflow: hidden;
  transform: rotate(${() => Math.random() * 10 - 5}deg);
  z-index: ${props => props.isDragging ? 1000 : 1};
  transition: z-index 0s, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 200px;
    min-height: 250px;
  }
`;

const Pin = styled.div<{ backgroundColor: string }>`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background-color: ${props => props.backgroundColor};
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 15px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0 0 2px 2px;
  }
`;

const MessageImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
  border: 1px solid #ddd;
`;

const MessageCaption = styled.p`
  font-family: 'Permanent Marker', cursive;
  font-size: 1rem;
  line-height: 1.4;
  text-align: center;
  color: #333;
`;

const AudioIcon = styled(FaMusic)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: ${props => props.theme.colors.primary};
`;

interface MessageProps extends MessageType {
  onExpand: () => void;
  onDragEnd: (x: number, y: number) => void;
}

const MessageComponent: React.FC<MessageProps> = ({ content, image, audio, initialX, initialY, color, onExpand, onDragEnd }) => {
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const rotate = useMotionValue(Math.random() * 20 - 10);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  let clickTimer: number | null = null;

  const handleClick = () => {
    clickTimer = setTimeout(() => {
      if (!isDragging) {
        onExpand();
      }
    }, 200);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    if (clickTimer) {
      clearTimeout(clickTimer);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd(x.get(), y.get());
  };

  useEffect(() => {
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      setImageSrc(image);
    }
  }, [image]);

  return (
    <StyledMessage
      drag
      dragMomentum={false}
      style={{ x, y, rotate }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      backgroundColor={color}
      isDragging={isDragging}
      onMouseDown={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Pin backgroundColor={color} />
      {imageSrc && <MessageImage src={imageSrc} alt="Message" />}
      <MessageCaption>{content}</MessageCaption>
      {audio && <AudioIcon />}
    </StyledMessage>
  );
};

export default MessageComponent;