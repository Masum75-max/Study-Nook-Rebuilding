'use client';

import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="max-w-md w-full text-center space-y-8 bg-slate-900/50 p-8 sm:p-10 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* Glow Background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Big 404 & Icon */}
        <div className="relative flex justify-center items-center">
          <span className="text-8xl font-black text-slate-800/60 select-none tracking-tighter">
            404
          </span>
          <div className="absolute inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 backdrop-blur-md">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The page you are looking for doesnt exist, was removed, or is temporarily unavailable.
          </p>
        </div>

        {/* Button */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm transition-all duration-300 hover:bg-indigo-500 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}