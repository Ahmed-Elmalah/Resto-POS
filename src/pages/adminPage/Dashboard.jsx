import React from 'react';
import { MdPayments, MdShoppingBag, MdWarning, MdTrendingUp, MdSearch, MdNotifications, MdHelp } from 'react-icons/md';

import StatsCard from '../../components/adminComponents/dashboard/StatsCard';
import BestSellerCard from '../../components/adminComponents/dashboard/BestSellerCard';
import SalesChart from '../../components/adminComponents/dashboard/SalesChart';
import CategoryPieChart from '../../components/adminComponents/dashboard/CategoryPieChart';

// استدعاء المكونات الجديدة
import RecentOrdersTable from '../../components/adminComponents/dashboard/RecentOrdersTable';
import QuickActions from '../../components/adminComponents/dashboard/QuickActions';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <header className="h-16 bg-white dark:bg-[#1a2632] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-40 sticky top-0">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>
        
        <div className="flex items-center gap-6">
          <div className="relative w-64 hidden md:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <MdSearch size={20} />
            </span>
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20 text-sm placeholder-slate-400 outline-none transition-all" 
              placeholder="Search orders, items..." 
              type="text"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="size-9 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-blue-50 transition-colors relative">
              <MdNotifications size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="size-9 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-blue-50 transition-colors">
              <MdHelp size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth no-scrollbar">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* 1. KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="Today's Revenue" 
              value="$2,450.00" 
              icon={<MdPayments size={20} />} 
              color="blue"
              trend="up"
              trendValue={<><MdTrendingUp /> +12% from yesterday</>}
            />
            <StatsCard 
              title="Total Orders" 
              value="142" 
              icon={<MdShoppingBag size={20} />} 
              color="purple"
              trend="up"
              trendValue={<><MdTrendingUp /> +5% from yesterday</>}
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

          {/* 2. Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SalesChart />
            <CategoryPieChart />
          </div>

          {/* 3. Bottom Section: Recent Orders & Quick Actions (الجديد) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-full">
                <RecentOrdersTable />
            </div>
            <div className="h-full">
                <QuickActions />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}