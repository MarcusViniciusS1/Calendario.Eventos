import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import { PublicCalendar } from './pages/PublicCalendar';
import { LoginPage } from './pages/LoginPage';
import { AdminPanel } from './pages/AdminPanel';
import { useAuth } from './contexts/AuthContext';

type Page = 'calendar' | 'login' | 'admin';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('calendar');
  const { isAuthenticated } = useAuth();

  const navigateToCalendar = () => setCurrentPage('calendar');
  const navigateToLogin = () => setCurrentPage('login');
  const navigateToAdmin = () => setCurrentPage('admin');

 
  React.useEffect(() => {
    if (currentPage === 'admin' && !isAuthenticated) {
      setCurrentPage('calendar');
    }
  }, [isAuthenticated, currentPage]);

  switch (currentPage) {
    case 'login':
      return (
        <LoginPage
          onNavigateToCalendar={navigateToCalendar}
          onNavigateToAdmin={navigateToAdmin}
        />
      );
    case 'admin':
      return isAuthenticated ? (
        <AdminPanel onNavigateToCalendar={navigateToCalendar} />
      ) : (
        <PublicCalendar onNavigateToLogin={navigateToLogin} />
      );
    default:
      return <PublicCalendar onNavigateToLogin={navigateToLogin} />;
  }
};

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <AppContent />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;