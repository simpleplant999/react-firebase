import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { auth } from "../src/config/firebase";
import { Home } from "./views/home/Home";
import { Login } from "./views/login/Login";
import { Navbar } from "./views/navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { Profile } from "./views/profile/Profile";

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);
  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [user]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
