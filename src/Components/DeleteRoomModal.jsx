"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { AuthClient } from "better-auth/client";

export default function DeleteRoomModal({ roomId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const session = authClient.useSession();
    const userId = session?.data?.user?.id;

  const handleDelete = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allrooms/${roomId}`)

    const room = await res.json()

    const creatorId = room.creatorId

    console.log("Creator id",creatorId)


    if(creatorId !== userId){
      redirect('/unauthorized')
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allrooms/${roomId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && (data.deletedCount > 0 || data.acknowledged)) {
        toast.success("✅ Room deleted successfully!");
        setIsOpen(false);
        router.push("/rooms"); // ডিলিট সফল হলে অল রুমস পেজে নিয়ে যাবে
        router.refresh(); // রিফ্রেশ করে নতুন ডেটা আনবে
      } else {
        toast.error(data.message || "Failed to delete room!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Delete Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold py-3 px-4 rounded-xl transition-all text-sm"
      >
        <FiTrash2 className="text-lg" />
        <span>Delete</span>
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-150">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Are you sure you want to delete this room?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. This room will be permanently removed from the database.
            </p>

            <div className="flex items-center justify-end gap-3">
              {/* No / Cancel Button */}
              <button
                type="button"
                disabled={loading}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
              >
                No, Cancel
              </button>

              {/* Yes / Delete Button */}
              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}