import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "./Libraries/custom-axios";
import Loading from "./Loading";

export default function Login({ isSignedIn, setIsSignedIn, setUserInfo }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();
  // console.log(watch("email"));

  const onSubmit = async (data) => {
    const response = await axios.post("/api/signin", data);
    if (response.data.success) {
      setIsSignedIn(true);
      setUserInfo(response.data.data);
      navigate(response.data.data?.isPlaidLinked ? "/" : "/linkPlaid");
    } else alert(response.data.message || "Something went wrong");
  };

  useEffect(() => {
    if (isSignedIn) navigate("/");
  }, [isSignedIn]);

  return (
    <div className="flex flex-col md:flex-row items-center mt-20 md:justify-center md:gap-10 bg-[#2563eb] text-white">
      <form
        className="md:w-1/2 bg-white text-black py-10 px-8 md:px-12 lg:px-20 m-10 rounded-xl w-[80%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("email")}
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("password")}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex justify-center mb-5">
          <button
            type="submit"
            className={`bg-blue-600 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 text-center ${
              isSubmitting
                ? "cursor-not-allowed py-2"
                : "hover:bg-blue-700 py-2.5"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="text-white">
                <Loading />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>

        <div className="text-sm text-center">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="ml-1 text-blue-600 underline focus:outline-none text-nowrap"
          >
            Sign up
          </Link>
        </div>
      </form>
      <div className="mt-10 md:mt-0 md:w-1/2 px-5 md:px-10">
        <h2 className="text-2xl font-semibold mb-4">
          AI Stock Trade Recommendations
        </h2>
        <p className=" mb-4">
          Leverage the power of artificial intelligence to make informed trading
          decisions. Our AI-driven platform provides real-time stock
          recommendations, helping you maximize your investment potential and
          stay ahead of the market trends.
        </p>
      </div>
    </div>
  );
}
