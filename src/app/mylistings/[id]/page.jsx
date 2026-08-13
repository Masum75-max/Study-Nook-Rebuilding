import React from 'react';
import { singleRoom } from '../../../lib/engine';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineLocationMarker, HiOutlineUsers, HiOutlineSparkles } from 'react-icons/hi';
import { BiDollarCircle, BiChevronLeft } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import DeleteRoomModal from '../../../Components/DeleteRoomModal'; // ১. Delete Component Import করুন (সঠিক পাথ দিন)

const Detailspage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers()
  });

  const room = await singleRoom(id, token);

  const { _id, name, image, description, floor, capacity, hourlyRate, amenities = [] } = room || {};

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/rooms" 
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <BiChevronLeft className="text-xl" />
          <span>Go to the all rooms page</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100 shadow-sm">
          
          {/* Room Image */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-inner">
              <Image
                src={image}
                alt={name || "Room Image"}
                fill
                priority 
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Room Info */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between pt-2 lg:pt-0">
            <div>
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">
                  <HiOutlineLocationMarker className="text-sm" />
                  Floor: {floor}
                </span>
                <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg">
                  <HiOutlineUsers className="text-sm" />
                  Capacity: {capacity}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-1.5 my-5 bg-emerald-50/60 border border-emerald-100/50 w-fit px-4 py-2 rounded-xl">
                <BiDollarCircle className="text-emerald-600 text-2xl" />
                <span className="text-xl font-bold text-gray-900">{hourlyRate?.replace('$', '')}</span>
                <span className="text-sm text-gray-500 font-medium">/ hour</span>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Room Details</h4>
                <p className="text-gray-600 text-base leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-1">
                  <HiOutlineSparkles className="text-amber-500 text-base" />
                  <span>Amenities & Features</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <span 
                      key={index} 
                      className="text-sm bg-gray-50 text-gray-700 border border-gray-200/60 px-3 py-1.5 rounded-xl font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: Edit and Delete */}
            <div className="mt-6 lg:mt-auto pt-4 border-t border-gray-100 flex items-center gap-3">
              {/* Edit Button */}
              <Link 
                href={`/mylistings/${_id || id}/edit`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 transition-all text-sm"
              >
                <FiEdit className="text-lg" />
                <span>Edit Room</span>
              </Link>

              {/* ২. Delete Modal Component টি যুক্ত করা হয়েছে */}
              <DeleteRoomModal roomId={_id || id} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Detailspage;