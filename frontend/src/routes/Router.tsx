import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { FailedLogin } from "../pages/FailedLogin";
import { Todo } from "../pages/todo";
import  Dashboard  from "../pages/Dashboard";
import  Profile  from "../pages/Profile";
import  GetAccuracy  from "../pages/getaccuracy";

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
      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/fail_login" element={<FailedLogin />} />
      <Route path="/profile/:user_id" element={<Profile />} />
      <Route path="/GetAccuracy" element={<GetAccuracy  />} />
    </Routes>
  );
};
