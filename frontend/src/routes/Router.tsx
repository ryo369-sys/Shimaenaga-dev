import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { FailedLogin } from "../pages/FailedLogin";
import  Home  from "../pages/Home";
import { Todo } from "../pages/todo";
import  Dashboard  from "../pages/test";
import  Profile  from "../pages/Profile";
import  Bird  from "../pages/Bird";
import  FastApi  from "../pages/fastApi";

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Login />
          </>
        }
      />
      
      <Route path="/dashboard/:useId" element={<Dashboard />} />
      <Route path="/home/:age" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/bird" element={<Bird />} />
      <Route path="/register" element={<Register />} />
      <Route path="/fail_login" element={<FailedLogin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/FastApi" element={<FastApi />} />
    </Routes>
  );
};
