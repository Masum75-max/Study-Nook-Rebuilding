"use client";
import React, { useState } from 'react';
import Link from 'next/link';
// lucide-react থেকে প্রয়োজনীয় আইকন ইমপোর্ট করা হলো
import { BookOpenText, Menu, X, LogOut, UserCircle } from 'lucide-react'; 
import { 
  Button, 
  Avatar, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from '@heroui/react';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = authClient.useSession();
    const user = data?.user;

    // নেভিগেশন লিংকের তালিকা (ক্লিন কোডের জন্য আলাদা করা হয়েছে)
    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Rooms', href: '/rooms' },
        ...(user ? [
            { label: 'My Bookings', href: '/mybookings' },
            { label: 'Add Room', href: '/addRoom' }
        ] : [])
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* ১. লোগো এবং মোবাইল মেনু বাটন */}
                    <div className="flex items-center gap-3">
                        {/* মোবাইল মেনু টগল বাটন (Hamburger/X) */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none"
                            aria-label="Toggle Navigation"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" /> // Lucide X Icon
                            ) : (
                                <Menu className="w-6 h-6" /> // Lucide Menu Icon
                            )}
                        </button>

                        {/* কাস্টম টেক্সট লোগো: Study-Nook */}
                        <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 group">
                            {/* লোগো আইকন হিসেবে BookOpenText ব্যবহার করা হলো */}
                            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                                <BookOpenText className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tighter text-gray-950">
                                Study<span className="text-blue-600">Nook</span>
                            </span>
                        </Link>
                    </div>

                    {/* ২. ডেসটপ নেভিগেশন লিংকসমূহ */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-2">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-full transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* ৩. ডেসটপ অথেনটিকেশন বাটন বা ইউজার মেনু */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    {/* ইউজার প্রোফাইল বাটন */}
                                    <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-gray-200 hover:border-blue-200 bg-gray-50/50 hover:bg-white transition-all shadow-sm hover:shadow-md focus:outline-none">
                                        <Avatar 
                                            src={user?.image || undefined} 
                                            // ইমেজ না থাকলে Lucide UserCircle আইকন দেখাবে
                                            icon={<UserCircle className="w-6 h-6 text-gray-400" />}
                                            name={user?.name || 'User'} 
                                            className="w-9 h-9 text-sm border-2 border-white shadow-xs bg-gray-200" 
                                        />
                                        <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                                            {user?.name}
                                        </span>
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Menu Actions" variant="flat" className="w-60">
                                    <DropdownItem key="profile" className="h-16 gap-2 border-b border-gray-100">
                                        <p className="font-semibold text-xs text-gray-400">Signed in as</p>
                                        <p className="font-bold text-sm text-gray-900 truncate">{user?.email || user?.name}</p>
                                    </DropdownItem>
                                    <DropdownItem key="mybookings" href="/mybookings" className="text-gray-700">
                                        My Bookings
                                    </DropdownItem>
                                    <DropdownItem key="addRoom" href="/addRoom" className="text-gray-700">
                                        Add Room
                                    </DropdownItem>
                                    <DropdownItem 
                                        key="logout" 
                                        color="danger" 
                                        className="text-red-600 font-semibold"
                                        // লগআউট আইকন যুক্ত করা হলো
                                        endContent={<LogOut className="w-4 h-4" />}
                                        onClick={() => authClient.signOut()}
                                    >
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="light" className="font-medium text-gray-700 hover:text-blue-600 rounded-full">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button color="primary" className="font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20">
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ৪. মোবাইল ড্রপডাউন মেনু (Hamburger বাটন ক্লিক করলে দেখাবে) */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-3 rounded-xl text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        {user ? (
                            <div className="space-y-3">
                                {/* মোবাইল ইউজার প্রোফাইল কার্ড */}
                                <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                                    <Avatar 
                                        src={user?.image || undefined} 
                                        icon={<UserCircle className="w-7 h-7 text-gray-400" />}
                                        name={user?.name || 'User'} 
                                        className="w-12 h-12 border border-white shadow-sm bg-gray-200" 
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-base font-bold text-gray-950 truncate">{user?.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <Button 
                                    color="danger" 
                                    variant="flat" 
                                    className="w-full font-semibold rounded-xl text-red-600 bg-red-50 hover:bg-red-100"
                                    endContent={<LogOut className="w-4 h-4" />}
                                    onClick={() => {
                                        authClient.signOut();
                                        setIsOpen(false);
                                    }}
                                >
                                    Log Out
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                                    <Button variant="flat" className="w-full font-medium rounded-xl text-gray-800 bg-gray-100 hover:bg-gray-200/80">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full">
                                    <Button color="primary" className="w-full font-medium rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;