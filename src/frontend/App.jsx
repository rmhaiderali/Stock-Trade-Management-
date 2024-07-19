import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import ContactForm from "./Components/Contact";
import LinkPlaid from "./Components/LinkPlaid";
import Home from "./Components/Home";
import axios from "./Components/Libraries/custom-axios";

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
