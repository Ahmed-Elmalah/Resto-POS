import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') !== 'light');

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: ""
  });

  
  useEffect(() => {
    const savedUserData = sessionStorage.getItem('user-info');
    if (savedUserData) {
      const user = JSON.parse(savedUserData);
      setProfile({
        name: user.username || "",
        email: user.email || "",
        phone: user.phone_number || "",
        bio: user.bio || ""
      });
    }
  }, []);

  // 2. التحكم في الـ Dark Mode
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

  const handleChange = (el) => {
    const { name, value } = el.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };


  

  return (
    <div className="w-full h-full min-h-screen bg-[#F9FAFB] dark:bg-transparent overflow-y-auto custom-scrollbar transition-colors duration-300 text-left">
      <main className="max-w-212.5 mx-auto px-4 md:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        <div className="bg-white dark:bg-[#1A2632] rounded-4xl border border-gray-200 dark:border-white/5 shadow-2xl overflow-hidden transition-colors duration-300">

          <div className="h-24  from-[#FF4500]/10 to-transparent"></div>

          <div className="px-6 md:px-12 pb-12 -mt-12">

            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative group">
                <div
                  className="size-32 md:size-36 rounded-full border-4 border-white dark:border-[#1A2632] shadow-2xl bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=John")' }}
                ></div>
                <button className="absolute bottom-1 right-1 bg-[#FF4500] text-white p-2 rounded-full border-4 border-white dark:border-[#1A2632] hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                </button>
              </div>

              <div className="mt-4 w-full">
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="block mx-auto text-3xl font-black text-center bg-transparent text-gray-900 dark:text-white outline-none focus:text-[#FF4500] w-full transition-colors"
                />
                <span className="mt-2 inline-flex items-center px-4 py-1 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/20 text-[#FF4500] text-[10px] font-black uppercase tracking-widest">
                  Administrator
                </span>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-8">
              <h3 className="text-sm font-black text-gray-800 dark:text-white flex items-center gap-2 uppercase tracking-widest opacity-80">
                <span className="size-1.5 bg-[#FF4500] rounded-full"></span>
                Account Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={profile.email}
                    readOnly
                    className="w-full bg-transparent text-gray-400 dark:text-gray-500 font-medium py-2 border-b border-gray-100 dark:border-white/5 outline-none cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={profile.phone}
                    readOnly 
                    className="w-full bg-transparent text-gray-400 dark:text-gray-500 font-medium py-2 border-b border-gray-100 dark:border-white/5 outline-none cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Bio / Role Description</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-transparent text-gray-700 dark:text-gray-200 font-medium py-2 border-b border-gray-200 dark:border-white/10 focus:border-[#FF4500] outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button className="bg-[#FF4500] text-white px-8 py-3 rounded-xl font-black text-sm shadow-lg shadow-[#FF4500]/20 hover:scale-105 active:scale-95 transition-all">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-8 md:p-12 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
            <h3 className="text-sm font-black text-gray-800 dark:text-white mb-8 flex items-center gap-2 uppercase tracking-widest opacity-80">
              <span className="material-symbols-outlined text-[#FF4500] text-lg">lock</span>
              Security Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101922] focus:border-[#FF4500] outline-none transition-all text-gray-900 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101922] focus:border-[#FF4500] outline-none transition-all text-gray-900 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101922] focus:border-[#FF4500] outline-none transition-all text-gray-900 dark:text-white" />
              </div>
            </div>

            <button className="mt-8 px-8 py-3 bg-gray-100 dark:bg-white/5 text-[#FF4500] border border-transparent dark:border-[#FF4500]/20 rounded-xl font-black text-sm hover:bg-[#FF4500] hover:text-white transition-all">
              Update Password
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}