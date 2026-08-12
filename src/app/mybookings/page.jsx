
import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import RoomCard from '@/Components/RoomCard';

export const metadata = {
  title: 'My Bookings'
}
const MyBookingsPage = async() => {

     const {token} = await auth.api.getToken({
       headers:await headers()
     })
     const session = await auth.api.getSession({
        headers: await headers(),
      });

      const id= session.user.id
      

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mybookings/${id}`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })

      const myRoomsObj = await res.json()

    
      const myRooms = []

      for(const roomsObj of myRoomsObj){
        myRooms.push(roomsObj.room)
      }

    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
          {myRooms.map((room) => (
            <RoomCard key={room._id || room.id} room={room} />
          ))}
        </div>
        
    );
};

export default MyBookingsPage