import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';    

export default function ProfilePage() {
  const navigate = useNavigate();   
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') !== 'light');
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@restaurant.com",
    phone: "+1 (555) 123-4567",
    bio: "Full access to all restaurant settings, menu management, and staff accounts."
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F6F7F8] dark:bg-[#101922] transition-colors duration-300">
      
      {/* Fixed Header  */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 bg-white dark:bg-[#1A2632] border-b border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-[#FF4500] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#FF4500]/20">
            <span className="material-symbols-outlined">restaurant_menu</span>
          </div>
          <h2 className="text-xl font-black dark:text-white tracking-tight uppercase">RestoPOS</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#2A1C1A] text-[#FF4500] border border-transparent dark:border-white/5 transition-all active:scale-90">
            <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
          
          {/* Back Button*/}
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-bold text-sm hover:text-[#FF4500] transition-colors group"
          >
            <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
      </header>

      <div className="h-[73px]"></div>

      <main className="max-w-[900px] mx-auto px-4 md:px-8 py-10 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-[#1A2632] rounded-[32px] shadow-xl shadow-black/5 border border-gray-200 dark:border-white/5 overflow-hidden">
          
          {/* Profile Section */}
          <div className="relative pt-12 pb-8 px-6 text-center bg-gradient-to-b from-[#FF4500]/5 to-transparent">
            <div className="relative inline-block group">
              <div className="size-32 md:size-40 rounded-full border-4 border-white dark:border-[#1A2632] shadow-2xl bg-cover bg-center" style={{backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=John")'}}></div>
              <button className="absolute bottom-2 right-2 bg-[#FF4500] text-white p-2.5 rounded-full border-4 border-white dark:border-[#1A2632] hover:scale-110 transition-transform shadow-lg">
                <span className="material-symbols-outlined text-xl">photo_camera</span>
              </button>
            </div>
            <div className="mt-6">
              <input 
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="block mx-auto text-3xl font-black text-center bg-transparent text-gray-900 dark:text-white tracking-tight outline-none focus:text-[#FF4500] transition-colors w-full"
              />
              <span className="mt-2 inline-flex items-center px-4 py-1 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/20 text-[#FF4500] text-xs font-black uppercase tracking-widest">
                Administrator
              </span>
            </div>
          </div>

          {/* Account Details */}
          <div className="p-8 md:p-12">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="size-2 bg-[#FF4500] rounded-full"></span>
              Account Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input 
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full bg-transparent text-gray-900 dark:text-gray-200 font-medium py-2 border-b border-gray-200 dark:border-white/10 focus:border-[#FF4500] outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <input 
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent text-gray-900 dark:text-gray-200 font-medium py-2 border-b border-gray-200 dark:border-white/10 focus:border-[#FF4500] outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bio / Role Description</label>
                <textarea 
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows="2"
                  className="w-full bg-transparent text-gray-900 dark:text-gray-200 font-medium py-2 border-b border-gray-200 dark:border-white/10 focus:border-[#FF4500] outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button className="mt-10 px-8 py-3 bg-[#FF4500] text-white rounded-xl font-black text-sm shadow-lg shadow-[#FF4500]/30 hover:scale-105 active:scale-95 transition-all">
              Save Changes
            </button>
          </div>

          {/* Security Section */}
          <div className="p-8 md:p-12 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FF4500]">lock</span>
              Security Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold dark:text-gray-300 block text-left">Current Password</label>
                <input type="password" placeholder="Enter current password" className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101922] focus:border-[#FF4500] outline-none transition-all dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold dark:text-gray-300 block text-left">New Password</label>
                <input type="password" placeholder="Min. 8 characters" className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101922] focus:border-[#FF4500] outline-none transition-all dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold dark:text-gray-300 block text-left">Confirm Password</label>
                <input type="password" placeholder="Repeat new password" className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101922] focus:border-[#FF4500] outline-none transition-all dark:text-white" />
              </div>
            </div>

            <button className="mt-8 px-8 py-3 bg-white dark:bg-[#2A1C1A] text-[#FF4500] border border-[#FF4500]/20 rounded-xl font-black text-sm hover:bg-[#FF4500] hover:text-white transition-all shadow-sm">
              Update Password
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}