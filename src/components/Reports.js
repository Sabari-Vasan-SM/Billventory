import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]); // Added products state
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchProducts(); // Fetch products when component mounts
  }, [dateRange]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .gte('created_at', `${dateRange.start}T00:00:00`)
        .lte('created_at', `${dateRange.end}T23:59:59`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price');
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const getProductDetails = (productId) => {
    return products.find(product => product.id === productId) || { name: 'Unknown Product', price: 0 };
  };

  const calculateTotalSales = () => {
    return transactions.reduce((total, transaction) => total + transaction.total_amount, 0);
  };

  const calculateTotalItemsSold = () => {
    return transactions.reduce((total, transaction) => {
      return total + transaction.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '2rem',
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#1a365d',
            marginBottom: '0.5rem',
            background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Sales Analytics
          </h1>
          <p style={{ 
            color: '#64748b',
            fontSize: '1rem',
            maxWidth: '600px'
          }}>
            Track and analyze your sales performance. Filter by date range to view specific periods.
          </p>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          marginBottom: '2.5rem',
          border: '1px solid #e2e8f0'
        }}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '24px',
            backgroundColor: '#4f46e5',
            borderRadius: '4px'
          }}></span>
          Date Range Filter
        </h2>
        
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#475569',
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Start Date
            </label>
            <motion.input
              whileFocus={{ 
                boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.3)',
                borderColor: '#4f46e5'
              }}
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                transition: 'all 0.2s',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#475569',
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              End Date
            </label>
            <motion.input
              whileFocus={{ 
                boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.3)',
                borderColor: '#4f46e5'
              }}
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                transition: 'all 0.2s',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchTransactions}
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Apply Filters
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        <motion.div
          whileHover={{ y: -5 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#eef2ff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '24px', height: '24px', color: '#4f46e5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 style={{
                fontSize: '0.875rem',
                color: '#64748b',
                marginBottom: '0.25rem'
              }}>
                Total Sales
              </h3>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#1e293b'
              }}>
                ₹{calculateTotalSales().toFixed(2)}
              </p>
            </div>
          </div>
          <p style={{ 
            color: '#94a3b8',
            fontSize: '0.75rem',
            marginTop: '0.5rem'
          }}>
            {dateRange.start} to {dateRange.end}
          </p>
        </motion.div>
        
        <motion.div
          whileHover={{ y: -5 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#ecfdf5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '24px', height: '24px', color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 style={{
                fontSize: '0.875rem',
                color: '#64748b',
                marginBottom: '0.25rem'
              }}>
                Transactions
              </h3>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#1e293b'
              }}>
                {transactions.length}
              </p>
            </div>
          </div>
          <p style={{ 
            color: '#94a3b8',
            fontSize: '0.75rem',
            marginTop: '0.5rem'
          }}>
            {dateRange.start} to {dateRange.end}
          </p>
        </motion.div>
        
        <motion.div
          whileHover={{ y: -5 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#f0f9ff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '24px', height: '24px', color: '#0ea5e9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 style={{
                fontSize: '0.875rem',
                color: '#64748b',
                marginBottom: '0.25rem'
              }}>
                Items Sold
              </h3>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#1e293b'
              }}>
                {calculateTotalItemsSold()}
              </p>
            </div>
          </div>
          <p style={{ 
            color: '#94a3b8',
            fontSize: '0.75rem',
            marginTop: '0.5rem'
          }}>
            {dateRange.start} to {dateRange.end}
          </p>
        </motion.div>
      </motion.div>

      {/* Transaction History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '24px',
              backgroundColor: '#4f46e5',
              borderRadius: '4px'
            }}></span>
            Transaction History
          </h2>
          <p style={{ 
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            Showing {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
          </p>
        </div>
        
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              padding: '4rem'
            }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                transition: { 
                  repeat: Infinity, 
                  duration: 1, 
                  ease: "linear" 
                } 
              }}
              style={{
                width: '48px',
                height: '48px',
                border: '4px solid #e2e8f0',
                borderTopColor: '#4f46e5',
                borderRadius: '50%'
              }}
            />
          </motion.div>
        ) : transactions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4rem',
              textAlign: 'center'
            }}
          >
            <svg style={{ 
              width: '64px', 
              height: '64px', 
              color: '#e2e8f0', 
              marginBottom: '1.5rem' 
            }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              No transactions found
            </h3>
            <p style={{ 
              color: '#64748b', 
              marginBottom: '1.5rem',
              maxWidth: '400px'
            }}>
              There are no transactions for the selected date range.
            </p>
          </motion.div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            <AnimatePresence>
              {transactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '0.25rem'
                      }}>
                        Order #{transaction.id}
                      </h3>
                      <p style={{
                        color: '#64748b',
                        fontSize: '0.875rem'
                      }}>
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                    <span style={{
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {transaction.items.length} {transaction.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  
                  <div style={{
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '0.5rem'
                    }}>
                      Customer: <span style={{ color: '#1e293b', fontWeight: '500' }}>{transaction.customer_name}</span>
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '0.5rem'
                    }}>
                      Phone: <span style={{ color: '#1e293b', fontWeight: '500' }}>{transaction.customer_phone || 'N/A'}</span>
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748b'
                    }}>
                      Total Amount
                    </p>
                    <p style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1e293b'
                    }}>
                      ₹{transaction.total_amount.toFixed(2)}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewDetails(transaction)}
                    style={{
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      alignSelf: 'flex-start',
                      marginTop: 'auto'
                    }}
                  >
                    View Details
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {showModal && selectedTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Order Details
                </h2>
                <button
                  onClick={closeModal}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    color: '#64748b'
                  }}
                >
                  &times;
                </button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Customer Information
                </h3>
                <div style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontWeight: '500', color: '#1e293b' }}>Name:</span> {selectedTransaction.customer_name}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontWeight: '500', color: '#1e293b' }}>Phone:</span> {selectedTransaction.customer_phone || 'N/A'}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#64748b'
                  }}>
                    <span style={{ fontWeight: '500', color: '#1e293b' }}>Date:</span> {formatDate(selectedTransaction.created_at)}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Purchased Items
                </h3>
                <div style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  padding: '1rem'
                }}>
                  {selectedTransaction.items.map((item, index) => {
                    const product = getProductDetails(item.product_id);
                    return (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem 0',
                        borderBottom: index < selectedTransaction.items.length - 1 ? '1px solid #e2e8f0' : 'none'
                      }}>
                        <div>
                          <p style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#1e293b',
                            marginBottom: '0.25rem'
                          }}>
                            {product.name}
                          </p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#64748b'
                          }}>
                            ₹{product.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <p style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1e293b'
                        }}>
                          ₹{(product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#f1f5f9',
                borderRadius: '8px'
              }}>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Total Amount
                </p>
                <p style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1e293b'
                }}>
                  ₹{selectedTransaction.total_amount.toFixed(2)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reports;