import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LandingPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0e6d2;
  perspective: 1500px;
`;

const Book = styled(motion.div)`
  width: 80%;
  max-width: 800px;
  height: 600px;
  position: relative;
  transform-style: preserve-3d;
`;

const Cover = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #8b4513;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
`;

const Page = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #f0e6d2;
  text-align: center;
  margin-bottom: 2rem;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: ${props => props.theme.fonts.heading};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 1rem;
`;

const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleOpen = () => setIsOpen(!isOpen);
  
    return (
      <LandingPageWrapper>
        <Book>
          <Cover
            initial={false}
            animate={{ rotateY: isOpen ? -180 : 0 }}
            transition={{ duration: 1 }}
          >
            <Title>Birthday Scrapbook</Title>
            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleOpen}>
              Open Scrapbook
            </Button>
          </Cover>
          <Page
            initial={{ rotateY: 180 }}
            animate={{ rotateY: isOpen ? 0 : 180 }}
            transition={{ duration: 1 }}
          >
            <Link to="/birthday-view">
              <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Birthday Person
              </Button>
            </Link>
            <Link to="/message-board">
              <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Leave a Message
              </Button>
            </Link>
          </Page>
        </Book>
      </LandingPageWrapper>
    );
  };

  export default LandingPage;