"use client";

import { authClient } from "@/lib/auth-client";
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from "next/navigation";
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
;

const hourlyRate = 500;

const timeSlots = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 8;
  return `${String(hour).padStart(2, "0")}:00`;
});

export default function BookingModal({room,id}) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  // End time must be after start time
  const availableEndTimes = startTime
    ? timeSlots.filter((time) => time > startTime)
    : [];

  // Calculate total cost
  const totalCost =
    startTime && endTime
      ? (parseInt(endTime.split(":")[0]) -
          parseInt(startTime.split(":")[0])) *
        hourlyRate
      : 0;

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    if (!date || !startTime || !endTime) {
      alert("Please select date, start time and end time.");
      return;
    }

 const bookingInfo = {
  bookerId: id,
  date: date,
  startTime: startTime,
  endTime: endTime,
  totalCost: totalCost,
  note: note,
  room: room
};

try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mybookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingInfo),
  });

  const data = await res.json();

 if (res.ok && data.success) {
      
      toast.success(data.message || 'Booking successful!');
      
      
    } else {
      
      toast.error(data.message || 'Booking failed!');
    }
  } catch (error) {
    
    toast.error('Something went wrong. Please try again!');
  }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <ToastContainer></ToastContainer>
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900">
            Booking Form
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Select your preferred date and booking time.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Date
            </label>

            <input
              id="date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Start Time */}
            <div>
              <label
                htmlFor="startTime"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>

              <select
                id="startTime"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setEndTime("");
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">Select start time</option>

                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* End Time */}
            <div>
              <label
                htmlFor="endTime"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                End Time
              </label>

              <select
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={!startTime}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">
                  {startTime
                    ? "Select end time"
                    : "Select start time first"}
                </option>

                {availableEndTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Hourly Rate</span>
              <span className="font-semibold text-gray-900">
                ৳{hourlyRate}/hour
              </span>
            </div>
          </div>

          {/* Total Cost */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>

                {startTime && endTime && (
                  <p className="mt-1 text-xs text-gray-500">
                    {startTime} - {endTime}
                  </p>
                )}
              </div>

              <p className="text-2xl font-bold text-blue-600">
                ৳{totalCost}
              </p>
            </div>
          </div>

          {/* Special Note */}
          <div>
            <label
              htmlFor="note"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Special Note{" "}
              <span className="font-normal text-gray-400">
                (Optional)
              </span>
            </label>

            <textarea
              id="note"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write any special instructions..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}