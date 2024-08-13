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
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
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