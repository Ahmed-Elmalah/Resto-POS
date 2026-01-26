import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
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
    /* 1. الحاوية الرئيسية: أصبحت تأخذ كامل الطول المتاح مع تفعيل السكرول العمودي */
    <div className="w-full h-full min-h-screen bg-transparent overflow-y-auto custom-scrollbar">
      
      <main className="max-w-[850px] mx-auto px-4 md:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* الكارت الرئيسي بتنسيق مطابق للـ Dashboard */}
        <div className="bg-[#1A2632] rounded-[32px] border border-white/5 shadow-2xl overflow-hidden">
          
          {/* خلفية تجميلية علوية بسيطة */}
          <div className="h-24 bg-gradient-to-r from-[#FF4500]/10 to-transparent"></div>

          <div className="px-6 md:px-12 pb-12 -mt-12">
            
            {/* قسم الصورة الشخصية والاسم */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative group">
                <div 
                  className="size-32 md:size-36 rounded-full border-4 border-[#1A2632] shadow-2xl bg-cover bg-center" 
                  style={{backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=John")'}}
                ></div>
                <button className="absolute bottom-1 right-1 bg-[#FF4500] text-white p-2 rounded-full border-4 border-[#1A2632] hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                </button>
              </div>
              
              <div className="mt-4 w-full">
                <input 
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="block mx-auto text-3xl font-black text-center bg-transparent text-white outline-none focus:text-[#FF4500] w-full"
                />
                <span className="mt-2 inline-flex items-center px-4 py-1 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/20 text-[#FF4500] text-[10px] font-black uppercase tracking-widest">
                  Administrator
                </span>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-8">
              <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-widest opacity-80">
                <span className="size-1.5 bg-[#FF4500] rounded-full"></span>
                Account Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full bg-transparent text-gray-200 font-medium py-2 border-b border-white/10 focus:border-[#FF4500] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                  <input 
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent text-gray-200 font-medium py-2 border-b border-white/10 focus:border-[#FF4500] outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Bio / Role Description</label>
                  <textarea 
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-transparent text-gray-200 font-medium py-2 border-b border-white/10 focus:border-[#FF4500] outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button className="bg-[#FF4500] text-white px-8 py-3 rounded-xl font-black text-sm shadow-lg shadow-[#FF4500]/20 hover:scale-105 active:scale-95 transition-all">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-8 md:p-12 bg-black/20 border-t border-white/5">
            <h3 className="text-sm font-black text-white mb-8 flex items-center gap-2 uppercase tracking-widest opacity-80">
              <span className="material-symbols-outlined text-[#FF4500] text-lg">lock</span>
              Security Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-white/10 bg-[#101922] focus:border-[#FF4500] outline-none transition-all text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-white/10 bg-[#101922] focus:border-[#FF4500] outline-none transition-all text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-white/10 bg-[#101922] focus:border-[#FF4500] outline-none transition-all text-white" />
              </div>
            </div>

            <button className="mt-8 px-8 py-3 bg-white/5 text-[#FF4500] border border-[#FF4500]/20 rounded-xl font-black text-sm hover:bg-[#FF4500] hover:text-white transition-all">
              Update Password
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}