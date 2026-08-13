"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import BookingModal from "./BookingModal";

const BookButton = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = authClient.useSession();
  const user = data?.user;
  
  const id =user?.id
 

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-semibold
          text-base
          py-4
          rounded-xl
          shadow-md
          shadow-blue-200/50
          hover:shadow-lg
          transition-all
          duration-300
          active:scale-[0.98]
        "
      >
        Book This Room Now
      </Button>

      {isOpen && <BookingModal room={room} id={id} ></BookingModal>}
    </>
  );
};

export default BookButton;