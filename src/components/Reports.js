import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/designSystem';

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
      padding: 0,
      minHeight: '100vh',
      fontFamily: typography.fontFamily
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
          marginBottom: spacing['2xl'],
          flexWrap: 'wrap',
          gap: spacing.lg
        }}
      >
        <div>
          <h1 style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.extrabold,
            color: colors.primary,
            marginBottom: spacing.sm,
            letterSpacing: '-0.5px'
          }}>
            📊 Sales Analytics
          </h1>
          <p style={{ 
            color: colors.gray600,
            fontSize: typography.fontSize.base,
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
          backgroundColor: colors.white,
          borderRadius: borderRadius.xl,
          padding: spacing.xl,
          boxShadow: shadows.lg,
          marginBottom: spacing['2xl'],
          border: `1px solid ${colors.gray200}`
        }}
      >
        <h2 style={{
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.gray900,
          marginBottom: spacing.lg,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
          fontFamily: typography.fontFamily
        }}>
          <span style={{
            display: 'inline-block',
            width: '4px',
            height: '24px',
            backgroundColor: colors.primary,
            borderRadius: borderRadius.sm
          }}></span>
          📅 Date Range Filter
        </h2>
        
        <div style={{ 
          display: 'flex', 
          gap: spacing.lg,
          flexWrap: 'wrap',
          marginBottom: spacing.lg
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{
              display: 'block',
              fontSize: typography.fontSize.sm,
              color: colors.gray600,
              marginBottom: spacing.xs,
              fontWeight: typography.fontWeight.medium,
              fontFamily: typography.fontFamily
            }}>
              Start Date
            </label>
            <motion.input
              whileFocus={{ 
                boxShadow: `0 0 0 3px ${colors.primary}20`,
                borderColor: colors.primary
              }}
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              style={{
                width: '100%',
                padding: `${spacing.sm} ${spacing.md}`,
                border: `1px solid ${colors.gray200}`,
                borderRadius: borderRadius.md,
                fontSize: typography.fontSize.sm,
                transition: 'all 0.2s',
                backgroundColor: colors.gray50,
                fontFamily: typography.fontFamily
              }}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{
              display: 'block',
              fontSize: typography.fontSize.sm,
              color: colors.gray600,
              marginBottom: spacing.xs,
              fontWeight: typography.fontWeight.medium,
              fontFamily: typography.fontFamily
            }}>
              End Date
            </label>
            <motion.input
              whileFocus={{ 
                boxShadow: `0 0 0 3px ${colors.primary}20`,
                borderColor: colors.primary
              }}
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              style={{
                width: '100%',
                padding: `${spacing.sm} ${spacing.md}`,
                border: `1px solid ${colors.gray200}`,
                borderRadius: borderRadius.md,
                fontSize: typography.fontSize.sm,
                transition: 'all 0.2s',
                backgroundColor: colors.gray50,
                fontFamily: typography.fontFamily
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: shadows.lg }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchTransactions}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              border: 'none',
              padding: `${spacing.sm} ${spacing.xl}`,
              borderRadius: borderRadius.md,
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs
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
          gap: spacing.lg,
          marginBottom: spacing['2xl']
        }}
      >
        <motion.div
          whileHover={{ y: -5, boxShadow: shadows.xl }}
          style={{
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            padding: spacing.lg,
            boxShadow: shadows.md,
            border: `1px solid ${colors.gray200}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: `${colors.primary}15`,
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: typography.fontSize['2xl']
            }}>
              💰
            </div>
            <div>
              <h3 style={{
                fontSize: typography.fontSize.sm,
                color: colors.gray600,
                marginBottom: spacing.xs,
                fontFamily: typography.fontFamily,
                fontWeight: typography.fontWeight.medium
              }}>
                Total Sales
              </h3>
              <p style={{
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.gray900,
                fontFamily: typography.fontFamily
              }}>
                ₹{calculateTotalSales().toFixed(2)}
              </p>
            </div>
          </div>
          <p style={{ 
            color: colors.gray500,
            fontSize: typography.fontSize.xs,
            marginTop: spacing.xs,
            fontFamily: typography.fontFamily
          }}>
            📅 {dateRange.start} to {dateRange.end}
          </p>
        </motion.div>
        
        <motion.div
          whileHover={{ y: -5, boxShadow: shadows.xl }}
          style={{
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            padding: spacing.lg,
            boxShadow: shadows.md,
            border: `1px solid ${colors.gray200}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: `${colors.success}15`,
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: typography.fontSize['2xl']
            }}>
              ✅
            </div>
            <div>
              <h3 style={{
                fontSize: typography.fontSize.sm,
                color: colors.gray600,
                marginBottom: spacing.xs,
                fontFamily: typography.fontFamily,
                fontWeight: typography.fontWeight.medium
              }}>
                Transactions
              </h3>
              <p style={{
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.gray900,
                fontFamily: typography.fontFamily
              }}>
                {transactions.length}
              </p>
            </div>
          </div>
          <p style={{ 
            color: colors.gray500,
            fontSize: typography.fontSize.xs,
            marginTop: spacing.xs,
            fontFamily: typography.fontFamily
          }}>
            📅 {dateRange.start} to {dateRange.end}
          </p>
        </motion.div>
        
        <motion.div
          whileHover={{ y: -5, boxShadow: shadows.xl }}
          style={{
            backgroundColor: colors.white,
            borderRadius: borderRadius.xl,
            padding: spacing.lg,
            boxShadow: shadows.md,
            border: `1px solid ${colors.gray200}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: `${colors.accent}15`,
              borderRadius: borderRadius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: typography.fontSize['2xl']
            }}>
              📦
            </div>
            <div>
              <h3 style={{
                fontSize: typography.fontSize.sm,
                color: colors.gray600,
                marginBottom: spacing.xs,
                fontFamily: typography.fontFamily,
                fontWeight: typography.fontWeight.medium
              }}>
                Items Sold
              </h3>
              <p style={{
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.gray900,
                fontFamily: typography.fontFamily
              }}>
                {calculateTotalItemsSold()}
              </p>
            </div>
          </div>
          <p style={{ 
            color: colors.gray500,
            fontSize: typography.fontSize.xs,
            marginTop: spacing.xs,
            fontFamily: typography.fontFamily
          }}>
            📅 {dateRange.start} to {dateRange.end}
          </p>
        </motion.div>
      </motion.div>

      {/* Transaction History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          backgroundColor: colors.white,
          borderRadius: borderRadius.xl,
          padding: spacing.xl,
          boxShadow: shadows.lg,
          border: `1px solid ${colors.gray200}`
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.lg,
          flexWrap: 'wrap',
          gap: spacing.md
        }}>
          <h2 style={{
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.gray900,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.sm,
            fontFamily: typography.fontFamily
          }}>
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '24px',
              backgroundColor: colors.primary,
              borderRadius: borderRadius.sm
            }}></span>
            🧾 Transaction History
          </h2>
          <p style={{ 
            color: colors.gray600,
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily
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
              padding: spacing['3xl']
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
                border: `4px solid ${colors.gray200}`,
                borderTopColor: colors.primary,
                borderRadius: borderRadius.full
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
              padding: spacing['3xl'],
              textAlign: 'center'
            }}
          >
            <div style={{ 
              fontSize: '64px',
              marginBottom: spacing.lg
            }}>
              📋
            </div>
            <h3 style={{ 
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.semibold,
              color: colors.gray900,
              fontFamily: typography.fontFamily,
              marginBottom: spacing.md
            }}>
              No Transactions Found
            </h3>
            <p style={{ 
              color: colors.gray600,
              fontSize: typography.fontSize.sm,
              maxWidth: '400px',
              fontFamily: typography.fontFamily
            }}>
              There are no transactions for the selected date range.
            </p>
          </motion.div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: spacing.lg
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
                  whileHover={{ y: -5, boxShadow: shadows.xl }}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: borderRadius.xl,
                    padding: spacing.lg,
                    boxShadow: shadows.md,
                    border: `1px solid ${colors.gray200}`,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: spacing.md
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: typography.fontSize.base,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.gray900,
                        marginBottom: spacing.xs,
                        fontFamily: typography.fontFamily
                      }}>
                        🧾 Order #{transaction.id}
                      </h3>
                      <p style={{
                        color: colors.gray600,
                        fontSize: typography.fontSize.sm,
                        fontFamily: typography.fontFamily
                      }}>
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                    <span style={{
                      backgroundColor: colors.gray100,
                      color: colors.gray700,
                      padding: `${spacing.xs} ${spacing.sm}`,
                      borderRadius: borderRadius.full,
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                      fontFamily: typography.fontFamily
                    }}>
                      {transaction.items.length} {transaction.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  
                  <div style={{
                    marginBottom: spacing.md,
                    paddingBottom: spacing.md,
                    borderBottom: `1px solid ${colors.gray200}`
                  }}>
                    <p style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.gray600,
                      marginBottom: spacing.xs,
                      fontFamily: typography.fontFamily
                    }}>
                      👤 Customer: <span style={{ color: colors.gray900, fontWeight: typography.fontWeight.medium }}>{transaction.customer_name}</span>
                    </p>
                    <p style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.gray600,
                      marginBottom: spacing.xs,
                      fontFamily: typography.fontFamily
                    }}>
                      📞 Phone: <span style={{ color: colors.gray900, fontWeight: typography.fontWeight.medium }}>{transaction.customer_phone || 'N/A'}</span>
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: spacing.md }}>
                    <p style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.gray600,
                      fontFamily: typography.fontFamily
                    }}>
                      Total Amount
                    </p>
                    <p style={{
                      fontSize: typography.fontSize.xl,
                      fontWeight: typography.fontWeight.bold,
                      color: colors.gray900,
                      fontFamily: typography.fontFamily
                    }}>
                      ₹{transaction.total_amount.toFixed(2)}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: shadows.md }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewDetails(transaction)}
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                      border: 'none',
                      padding: `${spacing.xs} ${spacing.md}`,
                      borderRadius: borderRadius.md,
                      cursor: 'pointer',
                      fontWeight: typography.fontWeight.medium,
                      fontSize: typography.fontSize.sm,
                      alignSelf: 'flex-start',
                      marginTop: 'auto',
                      fontFamily: typography.fontFamily
                    }}
                  >
                    👁️ View Details
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
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: spacing.md
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                backgroundColor: colors.white,
                borderRadius: borderRadius.xl,
                padding: spacing.xl,
                boxShadow: shadows['2xl'],
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
                marginBottom: spacing.lg
              }}>
                <h2 style={{
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.gray900,
                  fontFamily: typography.fontFamily
                }}>
                  📋 Order Details
                </h2>
                <button
                  onClick={closeModal}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: typography.fontSize.xl,
                    color: colors.gray600,
                    fontFamily: typography.fontFamily
                  }}
                >
                  ✖️
                </button>
              </div>

              <div style={{ marginBottom: spacing.xl }}>
                <h3 style={{
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.gray900,
                  marginBottom: spacing.md,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                  fontFamily: typography.fontFamily
                }}>
                  👤 Customer Information
                </h3>
                <div style={{
                  backgroundColor: colors.gray50,
                  borderRadius: borderRadius.md,
                  padding: spacing.md,
                  marginBottom: spacing.md
                }}>
                  <p style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.gray600,
                    marginBottom: spacing.xs,
                    fontFamily: typography.fontFamily
                  }}>
                    <span style={{ fontWeight: typography.fontWeight.medium, color: colors.gray900 }}>Name:</span> {selectedTransaction.customer_name}
                  </p>
                  <p style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.gray600,
                    marginBottom: spacing.xs,
                    fontFamily: typography.fontFamily
                  }}>
                    <span style={{ fontWeight: typography.fontWeight.medium, color: colors.gray900 }}>Phone:</span> {selectedTransaction.customer_phone || 'N/A'}
                  </p>
                  <p style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.gray600,
                    fontFamily: typography.fontFamily
                  }}>
                    <span style={{ fontWeight: typography.fontWeight.medium, color: colors.gray900 }}>Date:</span> {formatDate(selectedTransaction.created_at)}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: spacing.xl }}>
                <h3 style={{
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.gray900,
                  marginBottom: spacing.md,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                  fontFamily: typography.fontFamily
                }}>
                  🛒 Purchased Items
                </h3>
                <div style={{
                  backgroundColor: colors.gray50,
                  borderRadius: borderRadius.md,
                  padding: spacing.md
                }}>
                  {selectedTransaction.items.map((item, index) => {
                    const product = getProductDetails(item.product_id);
                    return (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: `${spacing.xs} 0`,
                        borderBottom: index < selectedTransaction.items.length - 1 ? `1px solid ${colors.gray200}` : 'none'
                      }}>
                        <div>
                          <p style={{
                            fontSize: typography.fontSize.sm,
                            fontWeight: typography.fontWeight.medium,
                            color: colors.gray900,
                            marginBottom: spacing.xs,
                            fontFamily: typography.fontFamily
                          }}>
                            {product.name}
                          </p>
                          <p style={{
                            fontSize: typography.fontSize.xs,
                            color: colors.gray600,
                            fontFamily: typography.fontFamily
                          }}>
                            ₹{product.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <p style={{
                          fontSize: typography.fontSize.sm,
                          fontWeight: typography.fontWeight.semibold,
                          color: colors.gray900,
                          fontFamily: typography.fontFamily
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
                padding: spacing.md,
                backgroundColor: colors.gray100,
                borderRadius: borderRadius.md
              }}>
                <p style={{
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.gray900,
                  fontFamily: typography.fontFamily
                }}>
                  💰 Total Amount
                </p>
                <p style={{
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.gray900,
                  fontFamily: typography.fontFamily
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