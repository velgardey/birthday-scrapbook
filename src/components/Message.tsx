import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';
import { Message as MessageType } from '../types';

const getContrastColor = (hexColor: string) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const StyledMessage = styled(motion.div)<{ backgroundColor: string }>`
  position: absolute;
  width: 300px;
  min-height: 300px;
  background-color: ${props => props.backgroundColor};
  color: ${props => getContrastColor(props.backgroundColor)};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: move;
  overflow: hidden;
`;

const MessageImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 5px;
`;

const MessageCaption = styled.p`
  font-size: 0.9rem;
  line-height: 1.2;
  max-height: 3.6em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: inherit;
`;

interface MessageProps extends MessageType {
  onExpand: () => void;
}

const MessageComponent: React.FC<MessageProps> = ({ content, image, initialX, initialY, color, onExpand }) => {
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
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
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      backgroundColor={color}
      onMouseDown={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {imageSrc && <MessageImage src={imageSrc} alt="Message" />}
      <MessageCaption>{content}</MessageCaption>
    </StyledMessage>
  );
};

export default MessageComponent;