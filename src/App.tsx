import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { RecipientView } from './pages/RecipientView';

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home onCreateClick={() => navigate('/dashboard')} />} />
      <Route path="/dashboard" element={<CreatorDashboard onBackToHome={() => navigate('/')} />} />
      <Route path="/to/:id" element={<RecipientView />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
