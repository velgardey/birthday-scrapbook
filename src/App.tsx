import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import MessageBoard from './pages/MessageBoard';
import BirthdayPersonView from './pages/BirthdayPersonView';
import GlobalStyle from './styles/GlobalStyles';
import theme from './styles/theme';
import PageTransition from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/message-board" element={<PageTransition><MessageBoard /></PageTransition>} />
        <Route path="/birthday-view" element={<PageTransition><BirthdayPersonView /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router basename="/birthday-scrapbook">
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;