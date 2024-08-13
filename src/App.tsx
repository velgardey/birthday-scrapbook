import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import LandingPage from './pages/LandingPage';
import MessageBoard from './pages/MessageBoard';
import BirthdayPersonView from './pages/BirthdayPersonView.tsx';
import GlobalStyle from './styles/GlobalStyles';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/message-board" element={<MessageBoard />} />
          <Route path="/birthday-view" element={<BirthdayPersonView />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;