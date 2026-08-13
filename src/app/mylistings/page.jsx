import RoomCardType2 from '../../Components/RoomCardType2'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const page = async() => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const id= session?.user?.id
    console.log(id)

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/createdRooms?userId=${id}`)
    const createdRooms = await res.json()
    console.log(createdRooms,"ye kya huua")
    return (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
                 {createdRooms.map((room) => (
                   <RoomCardType2 key={room._id || room.id} room={room} />
                 ))}
               </div>
    );
};

export default page;