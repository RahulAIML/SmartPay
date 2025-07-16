import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TransactionContext = createContext();

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - in a real app, this would be an API call
  const mockTransactions = [
    { id: 1, name: 'John Doe', type: 'Received', amount: 1200, status: 'Completed', date: '2023-06-01', category: 'Payment' },
    { id: 2, name: 'Amazon', type: 'Sent', amount: 89.99, status: 'Completed', date: '2023-06-02', category: 'Shopping' },
    { id: 3, name: 'Netflix', type: 'Sent', amount: 14.99, status: 'Completed', date: '2023-06-02', category: 'Subscription' },
    { id: 4, name: 'Jane Smith', type: 'Received', amount: 500, status: 'Pending', date: '2023-06-03', category: 'Payment' },
    { id: 5, name: 'Spotify', type: 'Sent', amount: 9.99, status: 'Completed', date: '2023-06-04', category: 'Subscription' },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchTransactions = async () => {
      try {
        // In a real app: const response = await axios.get('/api/transactions');
        // setTransactions(response.data);
        
        // Using mock data for now
        setTimeout(() => {
          setTransactions(mockTransactions);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getTransactionById = (id) => {
    return transactions.find(transaction => transaction.id === parseInt(id));
  };

  const value = {
    transactions,
    loading,
    error,
    getTransactionById,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
