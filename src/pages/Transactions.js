import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, DownloadIcon } from '@heroicons/react/outline';

// Mock data for transactions
const transactions = [
  { id: 1, name: 'Soham Roy', type: 'Received', amount: '$1,200.00', status: 'Completed', date: '2023-06-01', category: 'Payment' },
  { id: 2, name: 'Amazon', type: 'Sent', amount: '$89.99', status: 'Completed', date: '2023-06-02', category: 'Shopping' },
  { id: 3, name: 'Netflix', type: 'Sent', amount: '$14.99', status: 'Completed', date: '2023-06-02', category: 'Subscription' },
  { id: 4, name: 'Mohit Sharma', type: 'Received', amount: '$500.00', status: 'Pending', date: '2023-06-03', category: 'Payment' },
  { id: 5, name: 'Spotify', type: 'Sent', amount: '$9.99', status: 'Completed', date: '2023-06-04', category: 'Subscription' },
  { id: 6, name: 'Uber', type: 'Sent', amount: '$24.50', status: 'Completed', date: '2023-06-05', category: 'Transport' },
  { id: 7, name: 'Starbucks', type: 'Sent', amount: '$4.95', status: 'Completed', date: '2023-06-05', category: 'Food & Drink' },
  { id: 8, name: 'Mike Johnson', type: 'Received', amount: '$750.00', status: 'Completed', date: '2023-06-06', category: 'Payment' },
  { id: 9, name: 'Airbnb', type: 'Sent', amount: '$245.00', status: 'Completed', date: '2023-06-07', category: 'Travel' },
  { id: 10, name: 'Whole Foods', type: 'Sent', amount: '$87.34', status: 'Completed', date: '2023-06-08', category: 'Groceries' },
];

const statuses = {
  Completed: 'text-green-800 bg-green-100',
  Pending: 'text-yellow-800 bg-yellow-100',
  Failed: 'text-red-800 bg-red-100',
};

const types = {
  Received: 'text-green-600',
  Sent: 'text-gray-900',
};

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || transaction.status === selectedStatus;
    const matchesType = selectedType === 'All' || transaction.type === selectedType;
    const matchesDate = selectedDate === 'All' || transaction.date === selectedDate;

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const uniqueDates = [...new Set(transactions.map(t => t.date))];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      </div>
      
      {/* Filters */}
      <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  className="appearance-none bg-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FilterIcon className="h-4 w-4" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none bg-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Received">Received</option>
                  <option value="Sent">Sent</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FilterIcon className="h-4 w-4" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none bg-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="All">All Dates</option>
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FilterIcon className="h-4 w-4" />
                </div>
              </div>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <DownloadIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Export
              </button>
            </div>
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100">
                            <span className="text-indigo-600 font-medium">
                              {transaction.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                            <div className="text-sm text-gray-500">{transaction.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statuses[transaction.status] || 'bg-gray-100 text-gray-800'}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${types[transaction.type]}`}>
                        {transaction.type === 'Received' ? '+' : '-'}{transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/transactions/${transaction.id}`} className="text-indigo-600 hover:text-indigo-900">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No transactions found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
