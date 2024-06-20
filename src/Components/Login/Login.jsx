import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col md:flex-row items-center mt-20 md:justify-center md:gap-10 bg-[#2257D6] text-white">
      <form className="max-w-xl mx-auto md:w-1/2 bg-white text-black py-10 px-20 m-10 rounded-xl">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@example.com"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required=""
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className=" bg-[#2257D6] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <div className="text-sm text-center mt-4">
          <span className="text-gray-300">
            Don't have an account?
          </span>
          <Link
            to="/signup"
            className="ml-1 text-blue-400 underline focus:outline-none"
          >
            Sign up
          </Link>
        </div>
      </form>
      <div className="mt-10 md:mt-0 md:w-1/2 px-5 md:px-10">
        <h2 className="text-2xl font-semibold mb-4">AI Stock Trade Recommendations</h2>
        <p className=" mb-4">
          Leverage the power of artificial intelligence to make informed trading decisions. Our AI-driven platform provides real-time stock recommendations, helping you maximize your investment potential and stay ahead of the market trends.
        </p>
 
      
      </div>
    </div>
  );
}

export default Login;
