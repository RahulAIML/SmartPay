import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import TransactionDetail from './pages/TransactionDetail';
import Login from './pages/Login';

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Always start unauthenticated
  useEffect(() => {
    console.log('Starting in unauthenticated state');
    setIsAuthenticated(false);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Simply set the auth state to false
    setIsAuthenticated(false);
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated && (
        <>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </>
      )}
      
      <div className={`${isAuthenticated ? 'md:pl-64' : ''} flex flex-col flex-1`}>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route 
                  path="/login" 
                  element={
                    isAuthenticated ? 
                    <Navigate to="/dashboard" replace /> : 
                    <Login onLogin={() => {
                      // Set authentication state without persisting
                      setIsAuthenticated(true);
                    }} />
                  } 
                />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/transactions/:id" element={<TransactionDetail />} />
                </Route>
                
                {/* Catch all - redirect to login */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
