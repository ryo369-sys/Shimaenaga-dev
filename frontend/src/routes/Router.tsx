import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { FailedLogin } from "../pages/FailedLogin";
import  Dashboard  from "../pages/Dashboard";
import  Profile  from "../pages/Profile"
import  PostDetail  from "../pages/PostDetail"
import { Navbar } from '../components/Navbar';

export const Router = () => {
  return (
    <Routes>
      {/* 💡 ログイン前ページ（Navbar なし） */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <Login />
          </>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/fail_login" element={<FailedLogin />} />

      {/* 💡 ログイン後ページ（Navbar あり） */}
      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <Dashboard />
          </>
        }
      />
      <Route
        path="/posts/:postId" 
        element={
          <>
            <Navbar />
            <PostDetail />
          </>
        }
      />
      <Route
        path="/profile/:user_id"
        element={
          <>
            <Navbar />
            <Profile />
          </>
        }
      />
    </Routes>
  );
};
