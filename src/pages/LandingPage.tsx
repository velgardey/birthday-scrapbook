import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  overflow: hidden;
`;

const Content = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-family: 'Dancing Script', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 2rem;
  font-family: 'Montserrat', sans-serif;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  color: #fda085;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #fda085;
    color: #ffffff;
  }
`;

const OptionsContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <LandingPageWrapper>
      <AnimatePresence>
        {!isOpen && (
          <Content
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Title>Birthday Scrapbook</Title>
            <Subtitle>Celebrate and share memories with loved ones</Subtitle>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
            >
              Open Scrapbook
            </Button>
          </Content>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <OptionsContainer
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <Title>Choose an Option</Title>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/birthday-view')}
            >
              It's My Day !
            </Button>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/message-board')}
            >
              I'm here to leave a message
            </Button>
          </OptionsContainer>
        )}
      </AnimatePresence>
    </LandingPageWrapper>
  );
};

export default LandingPage;