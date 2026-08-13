"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { BookOpenText, Menu, X, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = authClient.useSession();
    const user = data?.user;

    console.log(user?.image)

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
                
                {/* ১. লোগো এবং মোবাইল মেনু বাটন */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700 p-1 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm">
                            <BookOpenText className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            Study<span className="text-blue-600">Nook</span>
                        </span>
                    </Link>
                </div>

                {/* ২. ডেসটপ নেভিগেশন লিংকসমূহ */}
                <div className="hidden md:flex items-center gap-6 font-semibold text-gray-700 text-sm">
                    <Link href="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link href="/rooms" className="hover:text-blue-600 transition">Rooms</Link>
                    {user && (
                        <>
                            <Link href="/mybookings" className="hover:text-blue-600 transition">My Bookings</Link>
                             <Link href="/mylistings" className="hover:text-blue-600 transition">My Listings</Link>
                            <Link href="/addRoom" className="hover:text-blue-600 transition">Add Room</Link>
                        </>
                    )}
                </div>

                {/* ৩. ইউজার প্রোফাইল ও বাটন (Flex & Next Image) */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            {/* ইউজারের প্রোফাইল কার্ড */}
                            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full shadow-2xs">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
                                    {user?.image ? (
                                        <Image 
                                            src={user.image} 
                                            alt={user?.name || "User Picture"} 
                                            fill
                                            sizes="32px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User className="w-5 h-5 text-gray-500 m-auto mt-1.5" />
                                    )}
                                </div>
                                <span className="font-semibold text-gray-800 text-sm max-w-[120px] truncate">
                                    {user?.name}
                                </span>
                            </div>
                            
                            {/* লগআউট বাটন */}
                            <Button 
                                color="danger" 
                                variant="flat"
                                size="sm"
                                className="font-semibold rounded-full px-4  bg-red-600"
                                onClick={() => authClient.signOut()}
                            >
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="light" size="sm" className="font-semibold text-gray-700 hover:text-blue-600 rounded-full">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button color="primary" size="sm" className="font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xs">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            {/* ৪. মোবাইল ড্রপডাউন মেনু */}
            {isOpen && (
                <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3 bg-white">
                    <Link 
                        href="/" 
                        onClick={() => setIsOpen(false)}
                        className="text-gray-700 font-medium px-2 py-1.5 hover:bg-gray-50 rounded-lg"
                    >
                        Home
                    </Link>
                    <Link 
                        href="/rooms" 
                        onClick={() => setIsOpen(false)}
                        className="text-gray-700 font-medium px-2 py-1.5 hover:bg-gray-50 rounded-lg"
                    >
                        Rooms
                    </Link>

                    {user ? (
                        <>
                            <Link 
                                href="/mybookings" 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-700 font-medium px-2 py-1.5 hover:bg-gray-50 rounded-lg"
                            >
                                My Bookings
                            </Link>
                             <Link 
                                href="/mylistings" 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-700 font-medium px-2 py-1.5 hover:bg-gray-50 rounded-lg"
                            >
                                My Listings
                            </Link>


                            <Link 
                                href="/addRoom" 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-700 font-medium px-2 py-1.5 hover:bg-gray-50 rounded-lg"
                            >
                                Add Room
                            </Link>
                            
                            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
                                <div className="flex items-center gap-3 px-2">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
                                        {user?.image ? (
                                            <Image 
                                                src={user.image} 
                                                alt={user?.name || "User Picture"} 
                                                fill
                                                sizes="40px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <User className="w-6 h-6 text-gray-500 m-auto mt-2" />
                                        )}
                                    </div>
                                    <span className="font-bold text-gray-900">{user?.name}</span>
                                </div>
                                <Button 
                                    color="danger" 
                                    variant="flat" 
                                    className="w-full font-semibold rounded-xl bg-red-600"
                                    onClick={() => {
                                        authClient.signOut();
                                        setIsOpen(false);
                                    }}
                                >
                                    Log Out
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="flat" className="w-full font-medium text-gray-700 bg-gray-100 rounded-xl">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/signup" onClick={() => setIsOpen(false)}>
                                <Button color="primary" className="w-full font-medium bg-blue-600 text-white rounded-xl">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;