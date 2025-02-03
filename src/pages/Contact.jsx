import { useState } from "react";
import { toast } from "react-toastify";

import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-6">
          <p className="text-gray-600">
          Contact Us<br></br>
           📩📞
          We're here to help! If you have any questions or suggestions, feel free to reach out to us via email or phone. We're happy to assist you and will respond as soon as possible. 💬✨
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {/* <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.88 3.549c.323-.633-.124-1.349-.82-1.349H7.94c-.696 0-1.143.716-.82 1.35l1.64 3.194A1 1 0 009.69 7h4.62a1 1 0 00.89-.557l1.68-3.194zM12 14.43c-3.16 0-5.96-1.26-7.92-3.31a1 1 0 00-1.42.03l-2 2a1 1 0 00.02 1.42c2.71 2.72 6.35 4.35 10.32 4.35 3.97 0 7.61-1.63 10.32-4.35a1 1 0 00.02-1.42l-2-2a1 1 0 00-1.42-.03c-1.96 2.05-4.76 3.31-7.92 3.31z"
                  /> */}
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium">Our Address</h4>
                <p>
                Jordan Zarqa,New Zarqa</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {/* <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v6.75m0 0h6.75m-6.75 0v6.75m18-6.75v6.75m0 0H15m6.75 0V3m-6.75 0v6.75M3 21h18M4.5 21V3m0 18h15m0 0V3"
                  /> */}
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium">Contact</h4>
                <p>Mobile: +962 787491703</p>
                <p>Mail: Abdullahbainghanem@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {/* <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 10h16M4 14h16m-7 4h7"
                  /> */}
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium">Working hours</h4>
                <p>Monday - Friday: 08:00 - 17:00</p>
                <p>Saturday & Sunday: 08:00 - 12:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-8 shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-6">Ready to Get Started?</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Write your message..."
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

