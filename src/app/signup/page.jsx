'use client'
import { authClient } from '@/lib/auth-client';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {
  Button,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import React from 'react';
import Link from 'next/link';


const SignUpPage = () => {

const router = useRouter()
  const onSubmit = async(e) => {
    e.preventDefault();

    const username = e.target.username.value
    const email = e.target.email.value
    const password = e.target.password.value
    const imageUrl = e.target.imageUrl.value
    
  

      const { data, error } = await authClient.signUp.email({
      name: username, // required
      email: email, // required
      password: password, // required
      image: imageUrl,
      
    });

    
         
   
     if(error){
        
     toast.error(error.message||"Error signing up");
    

     }

     if(data){

        toast.success("Account created successfully!");

        router.push('/')
        
     }
  };
  const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <ToastContainer />
      <div className="w-full max-w-md rounded-2xl bg-white p-6 md:p-8 shadow-xl border">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create an Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Fill in your information to get started.
        </p>

        <Form className="w-full flex flex-col gap-5" onSubmit={onSubmit}>

          <TextField className="w-full" name="username">
            <Label>Username</Label>
            <Input placeholder="Enter username" />
            <Description>Choose a unique username for your account</Description>
          </TextField>

          <TextField
            className="w-full"
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            className="w-full"
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <TextField className="w-full" name="imageUrl">
            <Label>Image URL</Label>
            <Input placeholder="https://example.com/profile.jpg" />
            <Description>Enter the URL of your profile image</Description>
          </TextField>

          <div className="w-full flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">I agree to the terms & conditions</span>
          </div>

          <Button className="w-full" color="primary" type="submit">
            Sign Up
          </Button>

          <div className='w-full mx-auto flex flex-col items-center  my-3'>
            <p>Or</p>
            <Button onClick={signIn}>Login With Google</Button>
          </div>

        </Form>
         <p className="text-center text-sm text-gray-600">
          Already have an accout?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
      

    </div>
  );
};

export default SignUpPage;