import Blog from "./pages/Blog";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from "./pages/Register";

import { useAuth } from "./auth/auth";
import Timeline from "./pages/Timeline";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/blog"  element={  <Blog/> } />
          <Route path="/timeline"  element={  <Timeline/> } />
          <Route path="/account"  element={  <Account/> } />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;


const PrivateRoute = ({ children }) => {
  let auth = useAuth()
  if (!auth.token) {
    return (
      <Navigate to={"/"} replace />
    )
  }
  return children
}