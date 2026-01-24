import React from "react";
import { MdRestaurant } from "react-icons/md";
import SignUpForm from "../../components/signUpComponents/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center relative bg-[#101922] font-display">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 25, 34, 0.85), rgba(16, 25, 34, 0.95)), url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070')`,
        }}
      />

      {/* Scrollable Container for small screens */}
      <div className="relative z-10 w-full max-w-[95%] sm:max-w-[520px]  p-4 custom-scrollbar">
        <div className="bg-[#1c2127] rounded-xl shadow-2xl border border-[#3b4754]">
          {/* Header */}
          <div className="pt-5 pb-3 px-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <MdRestaurant size={30} />
              </div>
            </div>
            <h1 className="text-white tracking-tight text-[28px] font-bold leading-tight">
              Create Admin Account
            </h1>
            <p className="text-[#9dabb9] text-sm font-normal pt-2">
              Join the professional restaurant management network
            </p>
          </div>

          {/* الفورم المستقل */}
          <SignUpForm />
        </div>

        {/* Extra Footer Info */}
        <div className="mt-4  flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#60778a] text-[10px] sm:text-xs">
          <a className="hover:text-white transition-colors" href="#">
            Terms of Service
          </a>
          <a className="hover:text-white transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-white transition-colors" href="#">
            Security
          </a>
          <span className="text-gray-600">© 2026 DineOps Management SaaS</span>
        </div>
      </div>
    </div>
  );
}
