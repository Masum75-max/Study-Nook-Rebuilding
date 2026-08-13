import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { ArrowRight, DoorOpen } from 'lucide-react';
import MyBookingsRoomCard from '../../Components/MyBookingsRoomCard';

export const metadata = {
  title: 'My Bookings',
};

const MyBookingsPage = async () => {
  const headersList = await headers();

  // 1. Session and Token Fetch
  const tokenObj = await auth.api.getToken({ headers: headersList });
  const session = await auth.api.getSession({ headers: headersList });

  const token = tokenObj?.token;
  const id = session?.user?.id;

  // Unauthenticated check
  if (!id || !token) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500 font-semibold">Please log in to view your bookings.</p>
      </div>
    );
  }

  let myRooms = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mybookings/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: 'no-store', // Always get fresh dynamic data
    });

    if (res.ok) {
      const myRoomsObj = await res.json();

      // 2. Safely check if response is an Array before looping
      if (Array.isArray(myRoomsObj)) {
        myRooms = myRoomsObj
          .map((roomsObj) => roomsObj?.room)
          .filter(Boolean); // Filter out any null/undefined rooms
      }
    } else {
      console.error("Backend response error status:", res.status);
    }
  } catch (error) {
    console.error("Fetch Error in MyBookings:", error);
  }

  // 3. Empty State UI
  if (myRooms.length === 0) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-white">
        <div className="max-w-md w-full text-center space-y-6 flex flex-col items-center justify-center">
          
          {/* Glowing Icon Container */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-blue-50 border border-blue-100 p-6 rounded-3xl text-blue-600 shadow-sm">
              <DoorOpen className="w-12 h-12" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              You have not booked any rooms yet.
            </h2>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              Looking for a quiet place to study or work? Explore available rooms and make your first booking today.
            </p>
          </div>

          {/* Action Button */}
          <div>
            <Link href="/rooms">
              <Button
                color="primary"
                size="lg"
                className="font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 px-8 flex items-center gap-2 group"
              >
                <span>Explore All Rooms</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 4. Render Bookings
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {myRooms.map((room) => (
        <MyBookingsRoomCard key={room._id || room.id} room={room} />
      ))}
    </div>
  );
};

export default MyBookingsPage;