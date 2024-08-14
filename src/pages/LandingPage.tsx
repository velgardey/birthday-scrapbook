import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LandingPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
  background-color: #fff5e6;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #fff5e6;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Brush Script MT', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: 'Brush Script MT', cursive;
  background-color: #fda085;
  color: #8b4513;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f6d365;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
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
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Title>Birthday Scrapbook</Title>
          <Button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={toggleOpen}
          >
            Open Scrapbook
          </Button>
        </Cover>
        <Page
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isOpen ? 0 : 180 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Link to="/birthday-view">
            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              I'm The Birthday Person
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