import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledBackButton = styled(motion.button)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 20px;
  cursor: pointer;
  z-index: 1000;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.primary};
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: white;
    &::before {
      left: 0;
    }
  }
`;

const BackButton: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <StyledBackButton
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back
      </StyledBackButton>
    );
  };

export default BackButton;