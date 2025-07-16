import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/outline';
import { useTransactions } from '../context/TransactionContext';

const statusIcons = {
  Completed: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  Pending: <ClockIcon className="h-5 w-5 text-yellow-500" />,
  Failed: <XCircleIcon className="h-5 w-5 text-red-500" />,
};

export default function TransactionDetail() {
  const { id } = useParams();
  const { getTransactionById } = useTransactions();
  const transaction = getTransactionById(parseInt(id));

  if (!transaction) {
    return (
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <p>Transaction not found</p>
          <Link to="/transactions" className="text-indigo-600 hover:text-indigo-900 mt-4 inline-flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back to Transactions
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-6">
          <Link to="/transactions" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900">
            <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back to Transactions
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 mt-2">Transaction Details</h1>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                {transaction.name}
              </h2>
              <div className="flex items-center">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  transaction.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : transaction.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Transaction ID: {transaction.id}
            </p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className={`mt-1 text-sm sm:mt-0 sm:col-span-2 font-medium ${
                  transaction.type === 'Received' ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {transaction.type === 'Received' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formattedDate}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {transaction.type}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {transaction.category}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    {statusIcons[transaction.status]}
                    <span className="ml-2">{transaction.status}</span>
                  </div>
                </dd>
              </div>
              {transaction.reference && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Reference</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {transaction.reference}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          
          <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
            {transaction.status === 'Pending' && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel Transaction
              </button>
            )}
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
