import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const navItemVariants = {
    hover: { scale: 1.02, backgroundColor: 'rgba(74, 85, 104, 0.5)' },
    tap: { scale: 0.98 }
  };

  const logoutButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, backgroundColor: '#c53030' },
    tap: { scale: 0.95 }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <motion.nav
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(to right, #1a202c, #2d3748)',
          color: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Left side - Brand and Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              lineHeight: '1.75rem',
              margin: 0
            }}>
              Billing and Stock
            </h2>
            <p style={{
              fontSize: '0.75rem',
              color: '#a0aec0',
              margin: 0
            }}>
              Admin Panel
            </p>
          </div>

          <ul style={{ 
            display: 'flex', 
            gap: '0.5rem',
            margin: 0,
            padding: 0
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
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  textDecoration: 'none'
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>📦</span>
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
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  textDecoration: 'none'
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>🧾</span>
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
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  textDecoration: 'none'
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>📊</span>
                <span>Reports</span>
              </Link>
            </motion.li>

            {/* New Online Orders Button */}
            <motion.li whileHover="hover" whileTap="tap" variants={navItemVariants} style={{ listStyle: 'none' }}>
              <Link
                to="/dashboard/online-orders"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  textDecoration: 'none'
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>🛒</span>
                <span>Online Orders</span>
              </Link>
            </motion.li>
          </ul>
        </div>

        {/* Right side - User and Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '9999px',
              background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              A
            </div>
            <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>Admin</span>
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
              padding: '0.5rem 1rem',
              backgroundColor: '#e53e3e',
              color: 'white',
              borderRadius: '0.375rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            <AnimatePresence mode="wait">
              {isHoveringLogout ? (
                <motion.span
                  key="logout-text"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  Logout <span style={{ marginLeft: '0.5rem' }}>👋</span>
                </motion.span>
              ) : (
                <motion.span
                  key="default-text"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
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
        padding: '1.5rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            padding: '1.5rem',
            height: '100%'
          }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;