import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Toast from './components/common/Toast';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SchemeFinder from './pages/SchemeFinder';
import Recommendations from './pages/Recommendations';
import SchemeDetails from './pages/SchemeDetails';
import DocumentCheck from './pages/DocumentCheck';
import ApplicationRoadmap from './pages/ApplicationRoadmap';
import Support from './pages/Support';
import Admin from './pages/Admin';

// Layout wrapper for protected/internal views
function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-slate-950 flex flex-col overflow-hidden overscroll-none">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full overflow-y-auto overscroll-contain">
          {children}
        </main>
      </div>

      <Toast />
    </div>
  );
}

// Protected Route wrapper component
function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <AppLayout>{children}</AppLayout>;
}

export default function App() {
  const { isAuthenticated, userRole } = useApp();

  return (
    <>
      <Routes>
        {/* Root Redirect: Always opens the Login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard & Inner Routes (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheme-finder"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SchemeFinder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Recommendations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schemes/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SchemeDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DocumentCheck />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmap"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ApplicationRoadmap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Support />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? (userRole === 'admin' ? "/admin" : "/dashboard") : "/login"}
              replace
            />
          }
        />
      </Routes>
    </>
  );
}
