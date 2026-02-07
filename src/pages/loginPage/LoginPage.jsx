import { MdRestaurant } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import LoginForm from "../../components/loginComponents/LoginForm";

export default function LoginPage() {
  return (
    <div className=" h-dvh flex items-center justify-center relative bg-[#101922] font-display overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 25, 34, 0.85), rgba(16, 25, 34, 0.85)), url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070')`,
        }}
      />

      <div className="relative z-10 w-full max-w-[480px] p-6">
        <div className="bg-[#1c2127]/90 backdrop-blur-md border border-[#3b4754] rounded-xl shadow-2xl overflow-hidden">
          {/* Branding Header */}
          <div className="flex flex-col items-center pt-7 pb-4 px-8 text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
              <MdRestaurant size={40} />
            </div>
            <h1 className="text-4xl font-black tracking-[0.05em] flex items-center gap-1.5 cursor-default">
              <span className="text-white">RESTO</span>
              <span className="text-[#ff4500]">POS</span>
            </h1>
            <p className="text-[#9dabb9] text-base text-[14px] mt-2">
              Welcome back. Please sign in to manage your restaurant dashboard
            </p>
          </div>

          {/* الفورم كاملة هنا */}
          <LoginForm />

          {/* Secure Footer Section */}
          <div className="bg-[#111418] py-3 px-8 border-t border-[#3b4754] flex items-center justify-center gap-2">
            <IoShieldCheckmarkOutline className="text-green-500" size={16} />
            <p className="text-[#60778a] text-[11px] uppercase tracking-widest font-bold">
              Secure SSL Connection
            </p>
          </div>
        </div>

        {/* روابط خارجية تحت الكارد */}
        <div className="flex justify-center gap-6 mt-4">
          {["Support", "Privacy", "Terms"].map((link) => (
            <a
              key={link}
              href="/"
              className="text-[#9dabb9] hover:text-white text-sm font-medium transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
