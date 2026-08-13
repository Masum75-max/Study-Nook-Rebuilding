'use client';
import React, { useState } from 'react';
import RoomCard from '@/Components/RoomCard';

const amenitiesList = [
  'wifi',
  'ac',
  'tv',
  'charger light',
  'Skylight View',
  'Modular Furniture',
  'Air Purifier',
  'Whiteboard Glass',
  "Soundproof"
,
"USB-C Ports"
,
"Ergonomic Chair"
,
"LED Lighting"
,
"Whiteboard",
"Large Whiteboard"
,
"Rolling Chairs"
,
"Dual Monitors"
,
"HDMI Output"
];

const SearchAndFilter = ({ rooms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = rooms.filter((room) =>
      room.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

 const handleAmenityChange = async (e) => {
  const value = e.target.value;
  if (!value) {
    setFilteredRooms(rooms);
   
    return;
  }

  
 

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms?amenity=${value}`
    );
    const data = await res.json();
    console.log(data)

    if (data.success) {
      setFilteredRooms(data.rooms);
    }
  } catch (error) {
    console.error('Error fetching filtered rooms:', error);
  } finally {
    console.log("Reached in finally")
  }
};

  return (
    <div>
      {/* Search + Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search rooms by name..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          onChange={handleAmenityChange}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Amenities</option>
          {amenitiesList.map((amenity) => (
            <option key={amenity} value={amenity}>
              {amenity}
            </option>
          ))}
        </select>
      </div>

      {/* Filtered Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRooms?.length > 0 ? (
          filteredRooms.map((room) => <RoomCard key={room.id} room={room} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No rooms found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;