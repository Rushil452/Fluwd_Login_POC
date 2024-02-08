"use client"; 

import { FaGoogle, FaFacebook, FaLinkedin, FaRegEnvelope } from "react-icons/fa"
import { useState } from "react";
import {MdLockOutline} from "react-icons/md"

export default function Home() {
  const [emailid, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailid || !password) {
      // Display error message if login fails
      setError(true)
      setMessage('Please enter both Email id and Password.');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailid, password })
      });
      if (response.status == 401) {
        // Handle login failure
        setError(true)
        setMessage('Please enter valid credentials');
        console.error('Login failed:', response.statusText);

      } else if (response.status == 200) {
        // Redirect to different page after successful login
        setError(false)
        setMessage('User logged In Successfully');
        setTimeout(() => {
          window.location.href = 'https://nextjs-demo.tailadmin.com/'; // Redirect to a different site
        }, 2000); 
        
        // Redirect or perform other actions upon successful login
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-2">
        <main className="flex flex-col items-center justify-center px-20 w-full text-center">
          <div className="bg-white rounded-2xl shadow-2xl flex w-1/3 max-w-4xl">
            {/* Login */}
            <div className="w-full p-5">
              <div className="text-left font-bold">
                <span className="text-violet-400 text-xl font-mono">fluwd</span>
              </div>
              <div className="py-10">
                <div className="text-2xl font-semibold text-sky-500 mb-2">Welcome back! Log in to proceed.</div>
                <div className="border-2 w-10 border-sky-500 inline-block mb-2"></div>
                <div className="flex justify-center my-2">
                  <a href="#" className="border-3 border-slate-300 bg-sky-400 rounded-full shadow-slate-300 shadow-md p-3 mx-3">
                    <FaGoogle />
                  </a>
                  <a href="#" className="border-3 border-slate-300 bg-sky-400 rounded-full shadow-slate-300 shadow-md p-3 mx-3">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="border-3 border-slate-300 bg-sky-400 rounded-full shadow-slate-300 shadow-md p-3 mx-3">
                    <FaFacebook />
                  </a>
                </div>
                <p className="mb-6 mt-5 text-sm text-gray-400">or login with your email account</p>
                <div className="flex flex-col items-center">
                  <p className="text-slate-600 mb-1 text-md">Email Id</p>
                  <div className="bg-gray-100 w-64 p-3 mb-3 rounded-sm flex items-center">
                    <FaRegEnvelope className="text-slate-400 mr-2"></FaRegEnvelope>
                    <input type="email" id="email" name="email" placeholder="Email address" value={emailid.trim().toLowerCase()} onChange={(e) => setEmail(e.target.value)} className="text-gray-600 bg-gray-100 outline-none flex-1 text-sm"></input>
                  </div>
                  <p className="text-slate-600 mb-1 text-md">Password</p>
                  <div className="bg-gray-100 w-64 p-3 flex items-center mb-3">
                    <MdLockOutline className="text-slate-400 mr-2"></MdLockOutline>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-gray-600 bg-gray-100 outline-none flex-1 text-sm" id="password" placeholder="Enter your password" minLength="8" required></input>
                  </div>
                  <div className="flex justify-between w-64 mb-5">
                    <label className="flex items-center text-xs text-slate-600 mr-2">
                      <input type="checkbox" className="mr-1" name="remember" id="rememberme"></input>
                      Remember me
                    </label>
                    <a href="#" className="text-xs text-slate-600">Forgot Password</a>
                  </div>
                  <button onClick={handleLogin} className="border-2 border-sky-500 text-sky-500 rounded-full px-12 py-2 inline-block hover:bg-sky-500 hover:text-white">Sign In</button>
                  {message && <p className={error ? "text-sky-500 text-sm" : "text-red-400 text-sm" }>{message}</p>}
                  <p className="text-xs text-slate-600 mt-1">New user? <a href="#" className="underline text-sky-500 hover:text-purple-400">Sign up</a> now!</p>
                </div>
              </div>
            </div>
            {/* Signup */}
            {/* <div className="w-2/5 bg-sky-500 rounded-tr-2xl rounded-br-2xl py-40 px-12">
              <h2 className="text-2xl font-sans font-semibold mb-2">Ready to join?</h2>
              <div className="border-2 w-10 border-white inline-block mb-2"></div>
              <p className="mb-5">Create your account now!</p>
              <a href="sign-up" className="border-2 border-white rounded-full px-12 py-2 inline-block hover:bg-white hover:text-sky-500">Sign Up</a>
            </div>        */}
          </div>
        </main>
      </div>
    </>
  );
}
