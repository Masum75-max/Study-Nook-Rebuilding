"use client";

import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


export default function RoomForm() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    description: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: "",
  });

  const [loading, setLoading] = useState(false);

  // Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const newRoom = {
      id: formData.id,
      name: formData.name,
      image: formData.image,
      description: formData.description,
      floor: formData.floor,
      capacity: formData.capacity,
      hourlyRate: formData.hourlyRate,
      amenities: formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allrooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("✅ Room added successfully!");

        setFormData({
          id: "",
          name: "",
          image: "",
          description: "",
          floor: "",
          capacity: "",
          hourlyRate: "",
          amenities: "",
        });
      } else {
        toast.error("❌ Failed to add room. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
        <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Add New Meeting Room
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Room ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="room_20"
          />

          <Input
            label="Room Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Curie Greenhouse"
          />

          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
          />

          <Input
            label="Floor"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            placeholder="Floor 5"
          />

          <Input
            label="Capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="4–6 people"
          />

          <Input
            label="Hourly Rate"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            placeholder="$10/hr"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Room Description..."
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Amenities (Comma Separated)
          </label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="WiFi, Whiteboard, AC, Projector"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Add Room"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block font-semibold mb-2">{label}</label>
      <input
        {...props}
        required
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}