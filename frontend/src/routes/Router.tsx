import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { Login } from "../components/Login";
import { FailedLogin } from "../pages/FailedLogin";
import  Home  from "../pages/Home";
import  Profile  from "../pages/Profile";


export const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <Header />
            <Login />
          </>
        }
      />
      <Route path="/home" element={<Home />} />
      <Route path="/fail_login" element={<FailedLogin />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
