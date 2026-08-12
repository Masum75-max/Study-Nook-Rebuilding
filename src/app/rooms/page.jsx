import React from 'react';
import { allRooms } from '@/lib/engine';
import RoomCard from '@/Components/RoomCard';


export const metadata ={
  title: 'Rooms'
}

const Roomspage = async() => {
 
    const rooms = await allRooms();
    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
         {rooms.map((room) => (
           <RoomCard key={room._id || room.id} room={room} />
         ))}
       </div>
    );
};

export default Roomspage;