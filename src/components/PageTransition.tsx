import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PageWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.background};
  z-index: 10;
  overflow: hidden;
`;

const DecorativeElement = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  background: ${props => props.theme.colors.accent};
  opacity: 0.2;
  border-radius: 50%;
`;

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    rotateY: -90,
  },
  in: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  out: {
    opacity: 0,
    scale: 1.1,
    rotateY: 90,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const decorativeVariants = {
  initial: { scale: 0, rotate: 0 },
  in: { scale: 1, rotate: 360, transition: { delay: 0.2, duration: 0.5 } },
  out: { scale: 0, rotate: 0 },
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageWrapper
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <DecorativeElement
        variants={decorativeVariants}
        style={{ top: '10%', left: '5%' }}
      />
      <DecorativeElement
        variants={decorativeVariants}
        style={{ bottom: '15%', right: '10%' }}
      />
      {children}
    </PageWrapper>
  );
};

export default PageTransition;