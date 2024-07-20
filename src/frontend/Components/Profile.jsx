import { useState } from "react";
import Loading from "./Loading";
import { useForm } from "react-hook-form";
import axios from "./Libraries/custom-axios";

export default function Profile({ userInfo, setUserInfo, isValidatingUser }) {
  if (isValidatingUser)
    return (
      <div className="flex grow justify-center items-center text-blue-500">
        <Loading />
      </div>
    );

  const { register, handleSubmit, watch, formState } = useForm();

  const [profilePicture, setProfilePicture] = useState(
    userInfo?.profilePicture
  );

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.profilePicture[0])
      formData.append("profilePicture", data.profilePicture[0]);

    const response = await axios.post("/api/changeProfile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data.success) {
      setUserInfo(response.data.data);
    } else alert(response.data.message || "Something went wrong");
  };

  return (
    <section className="flex grow dark:bg-gray-900 py-10">
      {formState.isSubmitting ? (
        <div className="text-white flex grow justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <div>
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                Profile
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center">
                  <div>
                    <img
                      className="w-[140px] h-[140px] bg-blue-300/20 rounded-full object-cover"
                      src={profilePicture || "/default_profile.jpg"}
                      onError={(e) => (e.target.src = "/default_profile.jpg")}
                    />
                    <div
                      className="flex items-center bg-white/90 rounded-full w-6 h-6 text-center relative bottom-[125px] left-[115px]"
                      style={{ bottom: "140px", left: "100px" }}
                    >
                      <input
                        type="file"
                        id="profilePicture"
                        hidden
                        {...register("profilePicture")}
                        onChange={(e) => {
                          register("profilePicture").onChange(e);
                          if (e.target.files[0])
                            setProfilePicture(
                              URL.createObjectURL(e.target.files[0])
                            );
                        }}
                      />
                      <label
                        htmlFor="profilePicture"
                        className="cursor-pointer"
                      >
                        <svg
                          data-slot="icon"
                          className="w-6 h-5 text-blue-700"
                          fill="none"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
                <h2 className="text-center font-semibold dark:text-gray-300">
                  Profile Information
                </h2>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="name" className="mb-2 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      defaultValue={userInfo.name}
                    />
                  </div>
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="email" className="mb-2 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      defaultValue={userInfo.email}
                    />
                  </div>
                </div>
                <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                  <button type="submit" className="w-full p-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
