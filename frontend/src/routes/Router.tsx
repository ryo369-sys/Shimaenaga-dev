import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { Login } from "../pages/Login";
import { FailedLogin } from "../pages/FailedLogin";
import  Home  from "../pages/Home";
import { Todo } from "../pages/todo";
import  Dashboard  from "../pages/test";
import  Profile  from "../pages/Profile";
import  Bird  from "../pages/Bird";


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
      <Route path="/todo" element={<Todo />} />
      <Route path="/bird" element={<Bird />} />
      <Route path="/fail_login" element={<FailedLogin />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
