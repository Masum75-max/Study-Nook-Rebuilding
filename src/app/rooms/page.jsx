import React from 'react';
import { allRooms } from '@/lib/engine';
import SearchAndFilter from '@/Components/SearchAndFilter';

export const metadata = {
  title: 'Rooms',
};

const Roomspage = async () => {
  const rooms = await allRooms();
  return (
    <div className="container mx-auto px-4 py-8">
      <SearchAndFilter rooms={rooms} />
    </div>
  );
};

export default Roomspage;