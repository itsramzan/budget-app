import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import Layout from "./components/Layout/Layout";
import PublicOutlet from "./components/PublicOutlet";
import PrivateOutlet from "./components/PrivateOutlet";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Budget from "./pages/Budget";
import NotFound from "./pages/NotFound";
import AppLoading from "./components/UI/AppLoading";

const App = () => {
  const authChecked = useAuthCheck();

  return authChecked ? (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/*" element={<PublicOutlet />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/*" element={<PrivateOutlet />}>
            <Route path="profile" element={<Profile />} />
            <Route path="budget" element={<Budget />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  ) : (
    <AppLoading />
  );
};

export default App;
