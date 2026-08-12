import Image from 'next/image'; 
import { HiOutlineLocationMarker, HiOutlineUsers } from 'react-icons/hi';
import { BiDollarCircle } from 'react-icons/bi';
import Link from 'next/link';

export default function RoomCard({ room }) {


  const { name, image, description, floor, capacity, hourlyRate, amenities = [] } = room;

  const maxAmenitiesToShow = 3;
  const visibleAmenities = amenities.slice(0, maxAmenitiesToShow);
  const remainingCount = amenities.length - maxAmenitiesToShow;

  const truncatedDescription = description.length > 100 
    ? `${description.substring(0, 100)}...` 
    : description;

  // ডিফল্ট ইমেজ ব্যাকআপ যদি কোনো অবজেক্টে ইমেজ না থাকে
  const defaultImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      
      {/* 1. Room Image Container */}
      {/* Next.js-এ object-fit: cover ব্যবহার করতে প্যারেন্ট ডিভে relative ক্লাস এবং ইমেজে fill প্রপ ব্যবহার করা সবচেয়ে বেস্ট প্র্যাকটিস */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <Image
          src={image || defaultImage}
          alt={name}
          fill // পুরো কন্টেইনার জুড়ে ইমেজ ছড়ানোর জন্য
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={false} // ইমেজ অলসভাবে (lazy) লোড হবে
        />
        
        {/* Hourly Rate Floating Badge */}
        <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 shadow-sm">
          <BiDollarCircle className="text-emerald-600 text-lg" />
          <span>{hourlyRate.replace('$', '')}</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-grow p-5">
        
        {/* Meta Info (Floor & Capacity) */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-2">
          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
            <HiOutlineLocationMarker className="text-blue-500 text-sm" />
            {floor}
          </span>
          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
            <HiOutlineUsers className="text-purple-500 text-sm" />
            {capacity}
          </span>
        </div>

        {/* 2. Room Name */}
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        {/* 3. Short Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 h-10 flex-grow">
          {truncatedDescription}
        </p>

        {/* 4. Amenities Chips */}
        <div className="flex flex-wrap gap-1.5 my-4 min-h-[28px]">
          {visibleAmenities.map((amenity, index) => (
            <span 
              key={index} 
              className="text-xs bg-blue-50/60 text-blue-700 px-2.5 py-1 rounded-md font-medium border border-blue-100/50"
            >
              {amenity}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium border border-gray-200/40">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* 5. View Details Button */}
        
         
         
        
        <Link 
  href={`/rooms/${room._id}`} 
  className="flex items-center justify-center w-full mt-auto bg-gray-900 hover:bg-blue-600 text-white font-medium text-sm py-3 rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98] text-center"
>
  View Details
</Link>
        
        
      </div>
    </div>
  );
}