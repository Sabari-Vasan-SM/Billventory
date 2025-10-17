import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const navItemVariants = {
    hover: { 
      scale: 1.02, 
      x: 5,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const logoutButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: '0 8px 16px rgba(220, 38, 38, 0.3)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      backgroundColor: '#f1f5f9',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          background: '#001f3f',
          color: 'white',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Left side - Brand and Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              lineHeight: '1.75rem',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              Billventory
            </h2>
            <p style={{
              fontSize: '0.7rem',
              color: '#94a3b8',
              margin: 0,
              marginTop: '2px',
              letterSpacing: '0.5px'
            }}>
              ADMIN DASHBOARD
            </p>
          </motion.div>

          <ul style={{ 
            display: 'flex', 
            gap: '0.75rem',
            margin: 0,
            padding: 0,
            alignItems: 'center'
          }}>
            <motion.li
              whileHover="hover"
              whileTap="tap"
              variants={navItemVariants}
              style={{ listStyle: 'none' }}
            >
              <Link
                to="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backgroundColor: isActive('/dashboard') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  border: isActive('/dashboard') ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid transparent',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isActive('/dashboard') && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                      borderRadius: '2px 2px 0 0'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>📦</span>
                <span>Products</span>
              </Link>
            </motion.li>

            <motion.li
              whileHover="hover"
              whileTap="tap"
              variants={navItemVariants}
              style={{ listStyle: 'none' }}
            >
              <Link
                to="/dashboard/billing"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backgroundColor: isActive('/dashboard/billing') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  border: isActive('/dashboard/billing') ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid transparent',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isActive('/dashboard/billing') && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                      borderRadius: '2px 2px 0 0'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>🧾</span>
                <span>Billing</span>
              </Link>
            </motion.li>

            <motion.li
              whileHover="hover"
              whileTap="tap"
              variants={navItemVariants}
              style={{ listStyle: 'none' }}
            >
              <Link
                to="/dashboard/reports"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backgroundColor: isActive('/dashboard/reports') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  border: isActive('/dashboard/reports') ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid transparent',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isActive('/dashboard/reports') && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                      borderRadius: '2px 2px 0 0'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>📊</span>
                <span>Reports</span>
              </Link>
            </motion.li>

            <motion.li 
              whileHover="hover" 
              whileTap="tap" 
              variants={navItemVariants} 
              style={{ listStyle: 'none' }}
            >
              <Link
                to="/dashboard/online-orders"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backgroundColor: isActive('/dashboard/online-orders') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  border: isActive('/dashboard/online-orders') ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid transparent',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isActive('/dashboard/online-orders') && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                      borderRadius: '2px 2px 0 0'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>🛒</span>
                <span>Online Orders</span>
              </Link>
            </motion.li>
          </ul>
        </div>

        {/* Right side - User and Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer'
            }}
          >
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}
            >
              A
            </motion.div>
            <div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem', display: 'block' }}>Admin</span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Administrator</span>
            </div>
          </motion.div>

          <motion.button
            onClick={handleLogout}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={logoutButtonVariants}
            onMouseEnter={() => setIsHoveringLogout(true)}
            onMouseLeave={() => setIsHoveringLogout(false)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#dc2626',
              color: 'white',
              borderRadius: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.95rem',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <AnimatePresence mode="wait">
              {isHoveringLogout ? (
                <motion.span
                  key="logout-text"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <motion.span
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    👋
                  </motion.span>
                  Goodbye
                </motion.span>
              ) : (
                <motion.span
                  key="default-text"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <svg 
                    style={{ width: '18px', height: '18px' }} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>
      
      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Animated background decoration */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #001f3f 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02)',
            padding: '2rem',
            minHeight: 'calc(100vh - 8rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative corner accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
            borderRadius: '0 24px 0 100%',
            pointerEvents: 'none'
          }} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;