import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ArrowDownIcon, CurrencyRupeeIcon } from '@heroicons/react/outline';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Mock data for the dashboard
const stats = [
  { name: 'Account Balance', value: '₹85,420', change: '+12%', changeType: 'increase', icon: CurrencyRupeeIcon },
  { name: 'This Month', value: '₹24,500', change: '+8.2%', changeType: 'increase', icon: ArrowUpIcon },
  { name: 'Spent', value: '₹18,240', change: '+3.8%', changeType: 'decrease', icon: ArrowDownIcon },
  { name: 'Savings', value: '₹12,450', change: '+5.2%', changeType: 'increase', icon: ArrowUpIcon },
];

// Expense categories data
const expenseCategories = {
  labels: ['Shopping', 'Food', 'Bills', 'Entertainment', 'Transport', 'Others'],
  datasets: [
    {
      data: [30, 25, 20, 15, 7, 3],
      backgroundColor: [
        '#6366F1',
        '#8B5CF6',
        '#EC4899',
        '#F43F5E',
        '#F59E0B',
        '#6B7280',
      ],
      borderWidth: 0,
    },
  ],
};



const recentTransactions = [
  { id: 1, name: 'Amazon India', type: 'Shopping', amount: '₹1,499', status: 'Completed', date: '2023-07-15', icon: '🛍️' },
  { id: 2, name: 'Swiggy', type: 'Food', amount: '₹450', status: 'Completed', date: '2023-07-15', icon: '🍔' },
  { id: 3, name: 'Salary Credit', type: 'Income', amount: '₹75,000', status: 'Completed', date: '2023-07-01', icon: '💰' },
  { id: 4, name: 'Zomato', type: 'Food', amount: '₹650', status: 'Completed', date: '2023-06-30', icon: '🍕' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('spending'); // 'spending' or 'income'
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats */}
        <div className="pb-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Dashboard</h3>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('spending')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                activeTab === 'spending' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Spending
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                activeTab === 'income' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Income
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 hover:border-indigo-200 transition-all duration-200"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{item.name}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{item.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    item.changeType === 'increase' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    <span className={`${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                      {item.change}
                    </span>{' '}
                    from last month
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link 
                  to="/send-money" 
                  className="bg-indigo-50 p-4 rounded-lg text-center hover:bg-indigo-100 transition-colors"
                >
                  <div className="mx-auto bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <ArrowUpIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Send Money</span>
                </Link>
                <Link 
                  to="/request-money" 
                  className="bg-green-50 p-4 rounded-lg text-center hover:bg-green-100 transition-colors"
                >
                  <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <ArrowDownIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Request Money</span>
                </Link>
                <Link 
                  to="/add-money" 
                  className="bg-purple-50 p-4 rounded-lg text-center hover:bg-purple-100 transition-colors"
                >
                  <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <CurrencyRupeeIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Add Money</span>
                </Link>
                <Link 
                  to="/pay-bills" 
                  className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors"
                >
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Pay Bills</span>
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
              <Link to="/transactions" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all
              </Link>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <li key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <Link to={`/transactions/${transaction.id}`} className="block">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2 mr-3">
                              <span className="text-lg">{transaction.icon}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.name}</p>
                              <p className="text-sm text-gray-500">{transaction.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${
                              transaction.type === 'Income' ? 'text-green-600' : 'text-gray-900'
                            }`}>
                              {transaction.type === 'Income' ? '+' : '-'} {transaction.amount}
                            </p>
                            <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expense Categories */}
          <div>
            <div className="bg-white p-4 rounded-lg shadow h-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Spending by Category</h3>
              <div className="h-56 flex items-center justify-center">
                <Doughnut 
                  data={expenseCategories}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                    cutout: '70%',
                  }}
                />
              </div>
              <div className="mt-4 space-y-3">
                {expenseCategories.labels.map((label, index) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: expenseCategories.datasets[0].backgroundColor[index] }}
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {expenseCategories.datasets[0].data[index]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
