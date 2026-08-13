"use client";

import { use } from "react";
import EditRoomForm from "../../../../Components/EditRoomForm"; // আপনার কম্পোনেন্টের সঠিক পাথ দিন

export default function EditRoomPage({ params: paramsPromise }) {
  // ১. URL থেকে শুধু ID টা নেওয়া হচ্ছে
  const params = use(paramsPromise);
  const roomId = params.id;

  return (
    <div className="py-10">
      {/* ২. roomId পাস করা হলো */}
      <EditRoomForm roomId={roomId} />
    </div>
  );
}