import Image from "next/image";
import Dashboard from '../Components/Dashboard.jsx'
import { homeRooms } from "@/lib/engine.js";
import RoomCard from "@/Components/RoomCard.jsx";
export const metadata = {
  title: 'Home', 
  description: 'Welcome to the Book Nook, your ultimate destination for discovering and booking the perfect rooms for your needs. Explore our diverse selection of rooms, from cozy spaces to luxurious suites, all designed to provide comfort and convenience.',
};

export default async function Home() {

  const rooms = await homeRooms();

 


  
  return (
    <div>
      <Dashboard></Dashboard>

      <div className="wrap text-5xl font-bold my-10 flex justify-center">

              Rooms To Try Out
      </div>

   

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
  {rooms.map((room) => (
    <RoomCard key={room._id || room.id} room={room} />
  ))}
</div>
    </div>
  );
}
