'use client';

import Link from 'next/link';
import { ShieldAlert, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 selection:bg-rose-500/30 selection:text-rose-200">
      <div className="max-w-md w-full text-center space-y-8 bg-slate-900/50 p-8 sm:p-10 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* Glow Background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 shadow-lg shadow-rose-500/5">
          <ShieldAlert className="w-10 h-10" />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <span className="text-xs font-semibold tracking-widest text-rose-500 uppercase">
            401 Error — Access Denied
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Unauthorized Access
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Oops! You dont have permission to view this page. Please log in with proper credentials or return home.
          </p>
        </div>

        {/* Button */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-medium text-sm transition-all duration-300 hover:bg-slate-200 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}