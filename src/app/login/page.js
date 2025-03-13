"use client"; // Mark this component as a Client Component

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

const LoginPage = () => {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const router = useRouter(); // Initialize the router

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    router.push("/builder"); // Navigate to /editor
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Cat Image on the Left */}
      <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-1/4">
        <Image
          src="/images/cat.png"
          alt="Cat"
          width={450} 
          height={450} 
          className="opacity-90" 
        />
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg w-full max-w-sm relative z-10 border border-black shadow-[8px_8px_0_0_#ABE60B]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo/logo.svg"
            alt="Pepino Logo"
            width={300}
            height={100}
          />
        </div>

        {/* Welcome Text */}
        <h6 className="text-center text-black text-md mb-6">
          ¡Qué alegría tenerte de vuelta!
        </h6>

        {/* Login Form */}
        <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={isHiddenPassword ? "password" : "text"}
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Contraseña"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setIsHiddenPassword(!isHiddenPassword)}
              >
                {isHiddenPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-4 flex justify-center">
            <button
              type="submit"
              className="text-black bg-primary py-2 px-8 rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Entrar
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button className="hover:text-primary text-sm">
            ¿Has olvidado tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;