"use client";

import { use } from "react";
import EditRoomForm from "../../../../Components/EditRoomForm"; 

export default function EditRoomPage({ params: paramsPromise }) {

  const params = use(paramsPromise);
  const roomId = params.id;

  return (
    <div className="py-10">
     
      <EditRoomForm roomId={roomId} />
    </div>
  );
}