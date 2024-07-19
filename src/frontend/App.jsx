import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import ContactForm from "./components/Contact";
import LinkPlaid from "./components/LinkPlaid";
import Home from "./components/Home";
import axios from "./libraries/custom-axios";

const App = () => {
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isValidatingUser, setIsValidatingUser] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios("/api/validateUser").then((response) => {
      setIsValidatingUser(false);
      if (!response.data.success) {
        if (!["/login", "/signup"].includes(window.location.pathname))
          navigate("/login");
      }
      //
      else {
        setIsSignedIn(true);
        setUserInfo(response.data.data);
        if (!response.data.data?.isPlaidLinked) return navigate("/linkPlaid");
      }
    });
  }, []);

  return (
    <div>
      <Navbar
        setIsSignedIn={setIsSignedIn}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home isSignedIn={isSignedIn} isValidatingUser={isValidatingUser} />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
              setUserInfo={setUserInfo}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
              setUserInfo={setUserInfo}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile userInfo={userInfo} setUserInfo={setUserInfo} />}
        />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/linkPlaid" element={<LinkPlaid userInfo={userInfo} />} />
        <Route
          path="/*"
          element={
            <div className="flex-grow flex justify-center items-center">
              <div>404 - PAGE NOT FOUND</div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
