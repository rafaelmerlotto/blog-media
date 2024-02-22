import Blog from "./pages/Blog";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from "./pages/Register";
import { useAuth } from "./auth/auth";
import Timeline from "./pages/Timeline";
import Account from "./pages/Account";
import DeletedAcount from "./components/DeletedAccount";
import Home from "./pages/Home";
import ChangePassword from "./components/ChangePassword";
import ForgetPassword from "./components/ForgetPassword";
import UpdatePost from "./components/UpdatePost";



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/blog" element={<PrivateRoute>  <Blog /></PrivateRoute>} />
          <Route path="/timeline" element={<PrivateRoute> <Timeline /></PrivateRoute>} />
          <Route path="/account" element={<PrivateRoute>  <Account /> </PrivateRoute>} />
          <Route path="/changePassword" element={<PrivateRoute>  <ChangePassword /></PrivateRoute>} />
          <Route path="/deletedAccount" element={<PrivateRoute><DeletedAcount /> </PrivateRoute>} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}



const PrivateRoute = ({ children }) => {
  let auth = useAuth()
  if (!auth.token) {
    return (
      <Navigate to={"/"} replace />
    )
  }
  return children
}