import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CommunityPage from "./pages/CommunityPage";
import {HomePage} from "./pages/HomePage";
import ClubsPage from "./pages/ClubsPage";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/authPage/LoginPage";
import Signup from './pages/authPage/Signup';
import ForgotPasswordPage from "./pages/authPage/ForgotPasswordPage";
import VerifyEmail from "./pages/authPage/VerifyEmail";
import ResetPassword from "./pages/authPage/ResetPassword";
import { useAuthStore } from "./store/authStore";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner";
import SavedPage from "./pages/SavedPage";
import CreatePage from "./pages/CreatePage";
import DiscoverPage from "./pages/DiscoverPage"; // Import DiscoverPage
import ClusterSubpage from "./pages/ClusterSubpage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/auth/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  console.log("isAuthenticated", isAuthenticated);
  console.log(user);

  return (
    <div className="">
      <Routes>
        <Route
          path="/auth/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <RedirectAuthenticatedUser>
             
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/auth/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPassword />
						</RedirectAuthenticatedUser>
					}
				/>

        <Route
          path="/*"
          element={
            <>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/Community" element={<CommunityPage />} />
                <Route path="/Clubs" element={<ClubsPage />} />
                <Route path="/Notifications" element={<NotificationPage />} />
                <Route path="/Profile" element={<ProfilePage />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/discover" element={<DiscoverPage />} /> 
                <Route path="/cluster/:clusterId" element={<ClusterSubpage />} />
              </Routes>
            </>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
