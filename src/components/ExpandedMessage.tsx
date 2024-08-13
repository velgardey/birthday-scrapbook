import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Message as MessageType } from '../types';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ExpandedMessageContainer = styled(motion.div)`
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

const ExpandedImage = styled.img`
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

interface ExpandedMessageProps extends MessageType {
  onClose: () => void;
}

const ExpandedMessage: React.FC<ExpandedMessageProps> = ({ content, image, onClose }) => {
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ExpandedMessageContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {image && <ExpandedImage src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="Expanded Message" />}
        <p>{content}</p>
      </ExpandedMessageContainer>
    </Overlay>
  );
};

export default ExpandedMessage;