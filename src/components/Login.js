import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import profilePic from '../assets/profilePic.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const profileImageUrl = profilePic;

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#001f3f',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      <motion.div
        variants={itemVariants}
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '440px',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo and Title Section */}
          <motion.div
            variants={itemVariants}
            style={{
              textAlign: 'center',
              marginBottom: '48px'
            }}
          >
            <motion.div
              animate={floatingAnimation}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '24px',
                background: '#001f3f',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0, 31, 63, 0.4)',
                padding: '4px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                background: `url(${profileImageUrl}) center/cover no-repeat`,
                border: '3px solid rgba(255, 255, 255, 0.9)'
              }} />
              
              {/* Shine effect */}
              <motion.div
                animate={{
                  x: [-100, 200],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  transform: 'skewX(-20deg)'
                }}
              />
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              style={{
                color: '#1a202c',
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '8px',
                letterSpacing: '-0.5px'
              }}
            >
              Welcome Back
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              style={{
                color: '#718096',
                fontSize: '15px',
                fontWeight: '500'
              }}
            >
              Velavan Super Stores
            </motion.p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#fee2e2',
                  color: '#dc2626',
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid #fca5a5',
                  overflow: 'hidden'
                }}
              >
                <motion.svg 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '20px', height: '20px', flexShrink: 0 }} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <motion.div
              variants={itemVariants}
              style={{ marginBottom: '20px', position: 'relative' }}
            >
              <motion.label
                animate={{
                  y: focusedField === 'email' || email ? -24 : 0,
                  scale: focusedField === 'email' || email ? 0.85 : 1,
                  color: focusedField === 'email' ? '#001f3f' : '#718096'
                }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '18px',
                  fontSize: '15px',
                  fontWeight: '600',
                  pointerEvents: 'none',
                  transformOrigin: 'left',
                  zIndex: 1,
                  background: 'white',
                  padding: '0 8px',
                  borderRadius: '4px'
                }}
              >
                User ID
              </motion.label>
              
              <motion.div
                animate={{
                  scale: focusedField === 'email' ? 1.01 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    border: `2px solid ${focusedField === 'email' ? '#001f3f' : '#e2e8f0'}`,
                    borderRadius: '16px',
                    fontSize: '15px',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: focusedField === 'email' 
                      ? '0 8px 20px rgba(0, 31, 63, 0.15)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.05)',
                    fontWeight: '500'
                  }}
                  required
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{ marginBottom: '32px', position: 'relative' }}
            >
              <motion.label
                animate={{
                  y: focusedField === 'password' || password ? -24 : 0,
                  scale: focusedField === 'password' || password ? 0.85 : 1,
                  color: focusedField === 'password' ? '#001f3f' : '#718096'
                }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '18px',
                  fontSize: '15px',
                  fontWeight: '600',
                  pointerEvents: 'none',
                  transformOrigin: 'left',
                  zIndex: 1,
                  background: 'white',
                  padding: '0 8px',
                  borderRadius: '4px'
                }}
              >
                Password
              </motion.label>
              
              <motion.div
                animate={{
                  scale: focusedField === 'password' ? 1.01 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    border: `2px solid ${focusedField === 'password' ? '#001f3f' : '#e2e8f0'}`,
                    borderRadius: '16px',
                    fontSize: '15px',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: focusedField === 'password' 
                      ? '0 8px 20px rgba(0, 31, 63, 0.15)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.05)',
                    fontWeight: '500'
                  }}
                  required
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 12px 30px rgba(0, 31, 63, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '18px',
                background: isLoading 
                  ? '#718096'
                  : '#001f3f',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 20px rgba(0, 31, 63, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Button shine effect */}
              {!isLoading && (
                <motion.div
                  animate={{
                    x: [-200, 200],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: 'skewX(-20deg)'
                  }}
                />
              )}
              
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%'
                      }}
                    />
                    <span>Signing In...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <motion.svg 
                      whileHover={{ x: 3 }}
                      style={{ width: '20px', height: '20px' }} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                    <span>Sign In</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;