import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  getTransactions,
  getEarningsSummary,
  getSpendingSummary
} from '../constants/mockData';

const Payments = () => {
  const [filter, setFilter] = useState('all'); // all, earning, spending
  const [statusFilter, setStatusFilter] = useState('all'); // all, completed, pending, processing, failed
  const [searchQuery, setSearchQuery] = useState('');

  const allTransactions = getTransactions();
  const earningsSummary = getEarningsSummary();
  const spendingSummary = getSpendingSummary();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-green-300', bg: 'bg-green-400/20' };
      case 'pending':
        return { icon: Clock, color: 'text-yellow-300', bg: 'bg-yellow-400/20' };
      case 'processing':
        return { icon: AlertCircle, color: 'text-blue-300', bg: 'bg-blue-400/20' };
      case 'failed':
        return { icon: XCircle, color: 'text-red-300', bg: 'bg-red-400/20' };
      default:
        return { icon: DollarSign, color: 'text-gray-300', bg: 'bg-gray-400/20' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredTransactions = allTransactions
    .filter(txn => {
      // Type filter
      if (filter !== 'all' && txn.type !== filter) return false;
      
      // Status filter
      if (statusFilter !== 'all' && txn.status !== statusFilter) return false;
      
      // Search filter
      if (searchQuery && !txn.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Payments & Earnings</h1>
          <p className="text-gray-400">Track your financial activity and transaction history</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Earnings */}
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-400/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
              <span className="text-xs text-gray-500">As Freelancer</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-1">
              SGD {earningsSummary.total.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-400">Total Earned</p>
            <div className="mt-4 pt-4 border-t border-dark-50">
              <p className="text-xs text-gray-500">
                {earningsSummary.count} completed transactions
              </p>
            </div>
          </div>

          {/* Pending Earnings */}
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-300" />
              </div>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-1">
              SGD {earningsSummary.pending.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-400">Awaiting Release</p>
            <div className="mt-4 pt-4 border-t border-dark-50">
              <p className="text-xs text-gray-500">
                Under client review
              </p>
            </div>
          </div>

          {/* Total Spending */}
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-red-400/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-300" />
              </div>
              <span className="text-xs text-gray-500">As Client</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-1">
              SGD {spendingSummary.total.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-400">Total Spent</p>
            <div className="mt-4 pt-4 border-t border-dark-50">
              <p className="text-xs text-gray-500">
                {spendingSummary.count} completed payments
              </p>
            </div>
          </div>

          {/* In Escrow */}
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-300" />
              </div>
              <span className="text-xs text-gray-500">Locked</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-1">
              SGD {spendingSummary.inEscrow.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-400">In Escrow</p>
            <div className="mt-4 pt-4 border-t border-dark-50">
              <p className="text-xs text-gray-500">
                Held until completion
              </p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Type Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gold-300 text-dark-200'
                    : 'bg-dark-200 text-gray-400 hover:text-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('earning')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  filter === 'earning'
                    ? 'bg-gold-300 text-dark-200'
                    : 'bg-dark-200 text-gray-400 hover:text-gray-300'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                Earnings
              </button>
              <button
                onClick={() => setFilter('spending')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  filter === 'spending'
                    ? 'bg-gold-300 text-dark-200'
                    : 'bg-dark-200 text-gray-400 hover:text-gray-300'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                Spending
              </button>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'completed', 'pending', 'processing', 'failed'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    statusFilter === status
                      ? 'bg-dark-50 text-gray-100 border border-gold-300/50'
                      : 'bg-dark-200 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 lg:ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 overflow-hidden">
          <div className="p-6 border-b border-dark-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-100">
                Transaction History ({filteredTransactions.length})
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-dark-200 text-gray-300 rounded-lg hover:bg-dark-200/80 transition-colors text-sm">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No transactions found</h3>
              <p className="text-gray-500">
                {searchQuery 
                  ? 'Try adjusting your search or filters'
                  : 'Your transactions will appear here'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-dark-50">
              {filteredTransactions.map((txn) => {
                const { icon: StatusIcon, color, bg } = getStatusIcon(txn.status);
                const isEarning = txn.type === 'earning';

                return (
                  <div
                    key={txn.id}
                    className="p-6 hover:bg-dark-200/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                        <StatusIcon className={`w-6 h-6 ${color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-100 mb-1">{txn.title}</h3>
                            <p className="text-sm text-gray-400">{txn.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className={`text-xl font-bold ${
                              isEarning ? 'text-green-300' : 'text-red-300'
                            }`}>
                              {isEarning ? '+' : '-'} SGD {txn.amount.toLocaleString()}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full mt-1 capitalize inline-block ${
                              txn.status === 'completed' ? 'bg-green-400/20 text-green-300' :
                              txn.status === 'pending' ? 'bg-yellow-400/20 text-yellow-300' :
                              txn.status === 'processing' ? 'bg-blue-400/20 text-blue-300' :
                              'bg-red-400/20 text-red-300'
                            }`}>
                              {txn.status}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(txn.date)}</span>
                            <span>•</span>
                            <span>{formatTime(txn.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{txn.paymentMethod}</span>
                          </div>
                          {txn.relatedContract && (
                            <div className="flex items-center gap-1">
                              <span className="text-gold-300">
                                {isEarning 
                                  ? `Client: ${txn.relatedContract.client}` 
                                  : `Freelancer: ${txn.relatedContract.freelancer}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Show More Button (if needed) */}
        {filteredTransactions.length > 10 && (
          <div className="mt-6 text-center">
            <button className="px-6 py-3 bg-dark-100 border border-dark-50 text-gray-300 rounded-lg hover:border-gold-300/50 transition-all">
              Load More Transactions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;