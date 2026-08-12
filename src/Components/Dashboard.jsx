// components/HeroBanner.js
import Image from 'next/image';
import Link from 'next/link';
import dash from '../../public/DashBoard.webp'; // Path to your dashboard image

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden group">
      {/* 1. Background Image (the 'dash' asset) */}
      <div className="absolute inset-0 z-0 scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out">
        <Image
          src={dash}
          alt="Dashboard - Historic Library Study Hall"
          fill
          priority // Prioritize loading for a hero image
          className="object-cover object-center filter grayscale-[30%]"
        />
      </div>

      {/* 2. Gradient Overlay for Text Visibility and Contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* 3. Text and Content Container (Centered for classic resume look) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 sm:px-10">
        <div className="max-w-3xl space-y-6">
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white drop-shadow-lg leading-tight">
            Find Your Perfect <br className="hidden md:block"/> Study Room
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-100/90 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Browse and book quiet, private study rooms in your library. List your own room and earn.
          </p>

          {/* Call to Action Button */}
          <div className="pt-4 sm:pt-6">
            <Link href="/rooms" passHref>
              <button className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-stone-900 text-white font-bold text-lg rounded-full shadow-2xl hover:bg-stone-800 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group-hover:shadow-3xl">
                Explore Rooms
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;