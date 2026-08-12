'use client'
import { Button } from '@heroui/react';
import React from 'react';
import { authClient } from '@/lib/auth-client';
import { ToastContainer, toast } from 'react-toastify';
const BookButton = ({room}) => {
    const {data} = authClient.useSession()
    
         const user = data?.user

         

    const addToBookings=async ()=>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({

    bookerId:user.id,
    room
  })
});

 if(res.ok){
    toast.success("Booking done successfully")
 }
 else{
     toast.warning("Already added")
 }



    }
    return (
        <div>
             <Button 
              
              onClick={addToBookings}
                
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 rounded-xl transition-all duration-300 shadow-md shadow-blue-200/50 hover:shadow-lg active:scale-[0.99] tracking-wide"
              >
                <ToastContainer></ToastContainer>
                Book This Room Now
              </Button>
            
        </div>
    );
};

export default BookButton;