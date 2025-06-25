import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@fluentui/react';
import './App.css';
import Layout from './layouts/Layout';
import ChatPage from './pages/ChatPage';
import MeetPage from './pages/MeetPage';
import CalendarPage from './pages/CalendarPage';
import CommunitiesPage from './pages/CommunitiesPage';
import ActivityPage from './pages/ActivityPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/meet" element={<MeetPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/activity" element={<ActivityPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
