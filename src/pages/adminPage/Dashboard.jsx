import React from 'react';
import { MdPayments, MdShoppingBag, MdWarning } from 'react-icons/md';

// Logic Hook
import { useDashboardData } from '../../customHook/useDashboardData';

// Components
import StatsCard from '../../components/adminComponents/dashboard/StatsCard';
import BestSellerCard from '../../components/adminComponents/dashboard/BestSellerCard';
import SalesChart from '../../components/adminComponents/dashboard/SalesChart';
import CategoryPieChart from '../../components/adminComponents/dashboard/CategoryPieChart';
import RecentOrdersTable from '../../components/adminComponents/dashboard/RecentOrdersTable';
import QuickActions from '../../components/adminComponents/dashboard/QuickActions';

export default function Dashboard() {
   
  const { todayOrders, stats, loading, error, refreshData } = useDashboardData();

  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-[#1a2632] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-40 sticky top-0">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>
        
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard 
                title="Today's Revenue" 
                value={`${stats.revenue} EGP`} 
                icon={<MdPayments size={20} />} 
                color="blue"
                trend="up"
                trendValue="Live"
              />
              <StatsCard 
                title="Today's Orders" 
                value={stats.count.toString()} 
                icon={<MdShoppingBag size={20} />} 
                color="purple"
                trend="up"
                trendValue="Real-time"
              />
              <StatsCard 
                title="Low Stock Alerts" 
                value="3 Items" 
                icon={<MdWarning size={20} />} 
                color="red"
                trend="down"
                trendValue="Needs Restocking"
              />
              <BestSellerCard />
            </div>

            {/* Charts - نمرر البيانات الحقيقية هنا */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SalesChart orders={todayOrders} />
              <CategoryPieChart orders={todayOrders} />
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                  <RecentOrdersTable orders={todayOrders} />
              </div>
              <div className="h-full">
                  <QuickActions />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}