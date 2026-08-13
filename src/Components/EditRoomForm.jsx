"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

export default function EditRoomForm({ roomId }) {
  const router = useRouter();
  const session = authClient.useSession();
  const userId = session?.data?.user?.id;


  const [fetching, setFetching] = useState(true); // ডাটা লোড হওয়ার স্টেট
  const [loading, setLoading] = useState(false);  // ফর্ম সাবমিটের সময় লোডিং স্টেট

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

  // ১. কম্পোনেন্ট মাউন্ট হলেই roomId দিয়ে ডাটা ফেচ করা হবে
  useEffect(() => {
    if (!roomId) return;

    const fetchRoomData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allrooms/${roomId}`);
        const data = await res.json();
        
        if (data) {
          setFormData({
            id: data.id || "",
            name: data.name || "",
            image: data.image || "",
            description: data.description || "",
            floor: data.floor || "",
            capacity: data.capacity || "",
            hourlyRate: data.hourlyRate || "",
            // amenities অ্যারে থাকলে কমা দিয়ে স্ট্রিং করা হচ্ছে
            amenities: Array.isArray(data.amenities)
              ? data.amenities.join(", ")
              : data.amenities || "",
          });
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
        toast.error("Failed to load room details!");
      } finally {
        setFetching(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  // Input Change Handler
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Form Submit Handler (PATCH)
  const handleSubmit = async (e) => {
     
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allrooms/${roomId}`)

    const room = await res.json()

    const creatorId = room.creatorId

    console.log("Creator id",creatorId)

    if(creatorId !== userId){
      redirect('/unauthorized')
    }

    const updatedRoom = {
      id: formData.id,
      creatorId: userId,
      name: formData.name,
      image: formData.image,
      description: formData.description,
      floor: formData.floor,
      capacity: formData.capacity,
      hourlyRate: formData.hourlyRate,
      amenities: typeof formData.amenities === "string"
        ? formData.amenities.split(",").map((item) => item.trim()).filter(Boolean)
        : formData.amenities,
    };
    const {data: tokenData}= await authClient.token()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allrooms/${roomId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
           authorization:`Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(updatedRoom),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        toast.success("✅ Room updated successfully!");
        router.push("/rooms"); 
        router.refresh();
      } else {
        toast.error("⚠️ No changes were made or update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error!");
    } finally {
      setLoading(false);
    }
  };

 
  if (fetching) {
    return (
      <div className="text-center py-20 font-medium text-gray-600">
        Loading room details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Edit Meeting Room
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
          {loading ? "Updating..." : "Update Room"}
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