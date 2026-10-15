import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateTravelPlanPage from './pages/CreateTravelPlanPage';
import FindCompanionsPage from './pages/FindCompanionsPage';
import MyTripsPage from './pages/MyTripsPage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppLayout = ({ children }) => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-badge">✈️</div>
          <span>Travel Companion</span>
        </div>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/trips">My Trips</NavLink>
              <NavLink to="/find-companions">Find Companions</NavLink>
              <NavLink to="/messages">Messages</NavLink>
              <NavLink to="/notifications">Notifications</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              {user?.roles?.includes('ADMIN') && <NavLink to="/admin">Admin</NavLink>}
              <button className="logout-button" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/create-trip" element={<ProtectedRoute><CreateTravelPlanPage /></ProtectedRoute>} />
        <Route path="/find-companions" element={<ProtectedRoute><FindCompanionsPage /></ProtectedRoute>} />
        <Route path="/trips" element={<ProtectedRoute><MyTripsPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
