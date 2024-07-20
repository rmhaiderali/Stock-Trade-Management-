import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./Libraries/custom-axios";

export default function Navbar({ userInfo, setIsSignedIn, setUserInfo }) {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  async function logout() {
    const response = await axios.post("/api/signout");
    if (response.data.success) {
      localStorage.removeItem("positions");
      localStorage.removeItem("positionsDate");
      setIsSignedIn(false);
      setUserInfo(null);
      setIsModalVisible(false);
      navigate("/login");
    } else alert(response.data.message || "Something went wrong");
  }

  return (
    <div>
      <nav
        className="mx-auto flex items-center justify-between p-6 sm:px-8"
        aria-label="Global"
      >
        <Link to="/">
          <img className="h-8 w-auto" src="/logo.png" />
        </Link>
        {userInfo && (
          <img
            className="h-8 w-8 rounded-full cursor-pointer"
            src={userInfo?.profilePicture || "/default_profile.jpg"}
            onClick={() => setIsModalVisible(true)}
            onError={(e) => (e.target.src = "/default_profile.jpg")}
          />
        )}
      </nav>
      <div
        className="w-[100vw] h-[100vh] z-10 bg-[#0008] translate-y-[-80px] fixed flex justify-center items-center"
        style={{
          opacity: isModalVisible ? "1" : "0",
          pointerEvents: isModalVisible ? "auto" : "none",
        }}
        onClick={() => setIsModalVisible(false)}
      >
        <div
          style={{
            display: "flex",
            width: "315px",
            padding: "20px 0",
            background: "#111827",
            borderRadius: "10px",
            justifyContent: "center",
            border: "1px solid gray",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <img
              src={userInfo?.profilePicture || "/default_profile.jpg"}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              onError={(e) => (e.target.src = "/default_profile.jpg")}
            />
            <p
              style={{
                color: "white",
                textAlign: "center",
                margin: "15px 0 20px",
              }}
            >
              {userInfo?.name}
            </p>
            <div className="flex flex-col gap-4">
              <div
                className="text-white border-0 py-2 px-4 focus:outline-none rounded text-md bg-blue-500 hover:bg-blue-600 select-none cursor-pointer text-center"
                onClick={() => {
                  setIsModalVisible(false);
                  navigate("/profile");
                }}
              >
                Change Profile
              </div>
              <div className="flex">
                <div
                  className="text-white border-0 py-2 px-4 focus:outline-none rounded text-md bg-green-500 hover:bg-green-600 select-none cursor-pointer"
                  style={{ marginRight: "15px" }}
                  onClick={() => {
                    setIsModalVisible(false);
                    navigate("/contact");
                  }}
                >
                  Contact Team
                </div>
                <div
                  className="text-white border-0 py-2 px-4 focus:outline-none rounded text-md bg-red-500 hover:bg-red-600 select-none cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", width: "0", height: "0" }}>
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "-10px",
              }}
              onClick={() => setIsModalVisible(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="lightgray"
                viewBox="0 0 16 16"
                style={{ cursor: "pointer" }}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
