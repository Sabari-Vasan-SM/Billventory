import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/designSystem';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity),
          category: newProduct.category || 'General'
        }]);

      if (error) throw error;
      
      setNewProduct({ name: '', price: '', quantity: '', category: '' });
      setIsFormOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  const updateProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity),
          category: newProduct.category || 'General'
        })
        .eq('id', editingId);

      if (error) throw error;
      
      setNewProduct({ name: '', price: '', quantity: '', category: '' });
      setEditingId(null);
      setIsFormOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  const editProduct = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category
    });
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
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
            📦 Product Management
          </h1>
          <p style={{ 
            color: colors.gray600,
            fontSize: typography.fontSize.base,
            maxWidth: '600px'
          }}>
            Manage your product inventory with ease. Add, edit, or remove products as needed.
          </p>
        </div>
        
        <div style={{ 
          display: 'flex',
          gap: spacing.md,
          flexWrap: 'wrap'
        }}>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: shadows.lg }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsFormOpen(true);
              setEditingId(null);
              setNewProduct({ name: '', price: '', quantity: '', category: '' });
            }}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              border: 'none',
              padding: `${spacing.md} ${spacing.xl}`,
              borderRadius: borderRadius.md,
              cursor: 'pointer',
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
              boxShadow: shadows.md,
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              fontFamily: typography.fontFamily
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Product
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.01 }}
            style={{
              position: 'relative',
              minWidth: '280px'
            }}
          >
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: `${spacing.md} ${spacing['2xl']} ${spacing.md} ${spacing.lg}`,
                border: `2px solid ${colors.gray200}`,
                borderRadius: borderRadius.md,
                fontSize: typography.fontSize.sm,
                boxShadow: shadows.sm,
                backgroundColor: colors.white,
                fontFamily: typography.fontFamily,
                fontWeight: typography.fontWeight.medium,
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px rgba(0, 31, 63, 0.1)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.gray200;
                e.target.style.boxShadow = shadows.sm;
              }}
            />
            <svg style={{
              position: 'absolute',
              right: spacing.lg,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
              color: colors.gray400
            }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Add/Edit Product Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: colors.white,
              borderRadius: borderRadius.xl,
              padding: spacing.xl,
              boxShadow: shadows.lg,
              marginBottom: spacing['2xl'],
              border: `1px solid ${colors.gray200}`,
              overflow: 'hidden'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.gray900,
                fontFamily: typography.fontFamily
              }}>
                {editingId ? '✏️ Edit Product' : '✨ Create New Product'}
              </h2>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingId(null);
                  setNewProduct({ name: '', price: '', quantity: '', category: '' });
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', 
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              {['name', 'price', 'quantity', 'category'].map((field) => (
                <div key={field}>
                  <label style={{
                    display: 'block',
                    fontSize: typography.fontSize.sm,
                    color: colors.gray700,
                    marginBottom: spacing.sm,
                    fontWeight: typography.fontWeight.semibold,
                    fontFamily: typography.fontFamily
                  }}>
                    {field.charAt(0).toUpperCase() + field.slice(1)} {field === 'price' && '(₹)'}
                  </label>
                  <input
                    type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
                    name={field}
                    value={newProduct[field]}
                    onChange={handleInputChange}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.boxShadow = `0 0 0 3px rgba(0, 31, 63, 0.1)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.gray200;
                      e.target.style.boxShadow = shadows.sm;
                    }}
                    style={{
                      width: '100%',
                      padding: `${spacing.md} ${spacing.lg}`,
                      border: `2px solid ${colors.gray200}`,
                      borderRadius: borderRadius.md,
                      fontSize: typography.fontSize.sm,
                      transition: 'all 0.2s ease',
                      backgroundColor: colors.white,
                      fontFamily: typography.fontFamily,
                      fontWeight: typography.fontWeight.medium,
                      outline: 'none',
                      boxShadow: shadows.sm
                    }}
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: colors.gray200 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingId(null);
                  setNewProduct({ name: '', price: '', quantity: '', category: '' });
                }}
                style={{
                  backgroundColor: colors.gray100,
                  color: colors.gray700,
                  border: 'none',
                  padding: `${spacing.md} ${spacing.xl}`,
                  borderRadius: borderRadius.md,
                  cursor: 'pointer',
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.sm,
                  fontFamily: typography.fontFamily,
                  transition: 'all 0.3s ease'
                }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: shadows.lg }}
                whileTap={{ scale: 0.98 }}
                onClick={editingId ? updateProduct : addProduct}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: 'none',
                  padding: `${spacing.md} ${spacing.xl}`,
                  borderRadius: borderRadius.md,
                  cursor: 'pointer',
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.sm,
                  boxShadow: shadows.md,
                  fontFamily: typography.fontFamily,
                  transition: 'all 0.3s ease'
                }}
              >
                {editingId ? '💾 Update Product' : '✨ Create Product'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.gray900,
            fontFamily: typography.fontFamily
          }}>
            📋 Product Inventory
          </h2>
          <span style={{ 
            backgroundColor: colors.gray100,
            color: colors.gray700,
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: borderRadius.full,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily
          }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
        </div>
        
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              padding: '4rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <svg style={{ 
              width: '64px', 
              height: '64px', 
              color: '#e2e8f0', 
              marginBottom: '1.5rem' 
            }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              No products found
            </h3>
            <p style={{ 
              color: '#64748b', 
              marginBottom: '1.5rem',
              maxWidth: '400px'
            }}>
              {searchTerm ? 'Try adjusting your search query' : 'Add your first product to get started'}
            </p>
            {searchTerm ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSearchTerm('')}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}
              >
                Clear search
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFormOpen(true)}
                style={{
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)'
                }}
              >
                Add Product
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="products-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: '1.5rem'
          }}>
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
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
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '0.25rem'
                      }}>
                        {product.name}
                      </h3>
                      <span style={{
                        backgroundColor: '#eef2ff',
                        color: '#4f46e5',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {product.category}
                      </span>
                    </div>
                    <span style={{
                      backgroundColor: '#f8fafc',
                      color: '#64748b',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      #{product.id}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        marginBottom: '0.25rem'
                      }}>
                        Price
                      </p>
                      <p style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1e293b'
                      }}>
                        ₹{product.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        marginBottom: '0.25rem'
                      }}>
                        Quantity
                      </p>
                      <p style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: product.quantity < 10 ? '#dc2626' : '#16a34a'
                      }}>
                        {product.quantity} {product.quantity < 10 && (
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#dc2626'
                          }}>
                            (Low stock)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginTop: '1.5rem'
                  }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => editProduct(product)}
                      style={{
                        flex: 1,
                        backgroundColor: '#eef2ff',
                        color: '#4f46e5',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteProduct(product.id)}
                      style={{
                        flex: 1,
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Products;