import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const OnlineOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  
  useEffect(() => {
    fetchOrders();

    const subscription = supabase
      .channel('orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      setDeletingId(orderId);
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;
      
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const renderItems = (items) => {
    let parsedItems;
    try {
      parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    } catch (e) {
      return <div className="invalid-item">Invalid item format</div>;
    }

    return Array.isArray(parsedItems) ? (
      <div className="items-list">
        {parsedItems.map((item, index) => (
          <div key={index} className="item-row">
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">x {item.quantity}</span>
          </div>
        ))}
      </div>
    ) : (
      <div className="invalid-item">Invalid item format</div>
    );
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Online Orders</h1>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`order-card ${deletingId === order.id ? 'deleting' : ''}`}
            >
              <div className="card-content">
                <div className="card-header">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">
                      {new Date(order.order_date).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    disabled={deletingId === order.id}
                    className={`delete-btn ${deletingId === order.id ? 'disabled' : ''}`}
                    aria-label="Delete order"
                  >
                    🗑️
                  </button>
                </div>

                <div className="card-details">
                  <div className="detail-row">
                    <div className="detail-icon">🛍️</div>
                    <div className="detail-content">
                      <h4>Items</h4>
                      <div className="items-container">
                        {renderItems(order.items)}
                      </div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-icon">💰</div>
                    <div>
                      <h4>Total</h4>
                      <p>₹{order.total_amount}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-icon">🏠</div>
                    <div>
                      <h4>Address</h4>
                      <p>{order.address}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-icon">📞</div>
                    <div>
                      <h4>Contact</h4>
                      <p>{order.name} • {order.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .orders-container {
          padding: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .orders-header h1 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 256px;
        }
        
        .loading-spinner::after {
          content: "";
          width: 48px;
          height: 48px;
          border: 4px solid #e5e7eb;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .no-orders {
          background: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: opacity 0.3s ease;
        }
        
        .no-orders p {
          color: #6b7280;
        }
        
        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .order-card {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .order-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .order-card.deleting {
          opacity: 0.5;
        }
        
        .card-content {
          padding: 1.25rem;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        
        .card-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }
        
        .order-date {
          color: #6b7280;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        
        .delete-btn {
          color: #ef4444;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
          transition: color 0.2s ease;
        }
        
        .delete-btn:hover {
          color: #dc2626;
        }
        
        .delete-btn.disabled {
          color: #9ca3af;
          cursor: not-allowed;
        }
        
        .card-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .detail-icon {
          background: #e5e7eb;
          color: #3b82f6;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .detail-content {
          flex: 1;
        }
        
        .detail-row h4 {
          font-weight: 500;
          color: #374151;
          margin: 0 0 0.25rem 0;
          font-size: 0.875rem;
        }
        
        .detail-row p {
          color: #6b7280;
          margin: 0;
          font-size: 0.875rem;
        }
        
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .item-row {
          display: flex;
          justify-content: space-between;
        }
        
        .item-name {
          font-weight: 500;
          color: #1f2937;
        }
        
        .item-quantity {
          color: #6b7280;
        }
        
        .invalid-item {
          color: #ef4444;
          font-size: 0.75rem;
        }
        
        @media (max-width: 768px) {
          .orders-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default OnlineOrders;