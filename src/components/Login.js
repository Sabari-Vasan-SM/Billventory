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
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

  const handleRecruiterAccess = () => {
    if (!acceptedTerms) return;
    
    setIsLoading(true);
    // Directly navigate to dashboard without login
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userEmail', 'recruiter@demo.com');
    setShowRecruiterModal(false);
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
      window.location.reload(); // Reload to update auth context
    }, 500);
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
          padding: 'clamp(24px, 5vw, 48px) clamp(20px, 4vw, 40px)',
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
              Billventory
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

            {/* Recruiter Access Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setShowRecruiterModal(true)}
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                color: '#6366f1',
                border: '2px solid #6366f1',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginTop: '16px'
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>I am a Recruiter</span>
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Recruiter Modal */}
      <AnimatePresence>
        {showRecruiterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowRecruiterModal(false);
              setAcceptedTerms(false);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: 'clamp(16px, 3vw, 24px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                padding: 'clamp(20px, 4vw, 40px)',
                width: '100%',
                maxWidth: '560px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowRecruiterModal(false);
                  setAcceptedTerms(false);
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: '#718096',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#1a202c'}
                onMouseLeave={(e) => e.target.style.color = '#718096'}
              >
                ✕
              </button>

              {/* Modal Header */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <svg style={{ width: '28px', height: '28px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1a202c',
                  marginBottom: '8px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Recruiter Access
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#718096',
                  lineHeight: '1.6'
                }}>
                  Please review and accept the terms before accessing the dashboard
                </p>
              </div>

              {/* Terms and Conditions */}
              <div style={{
                background: '#f7fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1a202c',
                  marginBottom: '12px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  📋 Terms and Conditions
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#4a5568',
                  lineHeight: '1.7',
                  marginBottom: '0'
                }}>
                  I am a recruiter or viewer accessing this project for <strong>demonstration or interview purposes only</strong>. I understand that I will have limited access and agree not to misuse or distribute project data. This access is provided solely for evaluation and should not be used for any commercial or unauthorized purposes.
                </p>
              </div>

              {/* Checkbox Agreement */}
              <motion.label
                whileHover={{ x: 2 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: acceptedTerms ? '#f0fdf4' : 'transparent',
                  border: `2px solid ${acceptedTerms ? '#10b981' : '#e2e8f0'}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#10b981',
                    marginTop: '2px'
                  }}
                />
                <span style={{
                  fontSize: '14px',
                  color: '#1a202c',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  I accept the agreement and understand the terms of this demonstration access
                </span>
              </motion.label>

              {/* Show Credentials Button */}
              <motion.button
                whileHover={acceptedTerms ? { 
                  scale: 1.02,
                  boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)'
                } : {}}
                whileTap={acceptedTerms ? { scale: 0.98 } : {}}
                onClick={handleRecruiterAccess}
                disabled={!acceptedTerms || isLoading}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: acceptedTerms && !isLoading
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : '#cbd5e0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: acceptedTerms && !isLoading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: acceptedTerms ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%'
                      }}
                    />
                    <span>Accessing...</span>
                  </>
                ) : (
                  <>
                    <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Open Site</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Login;