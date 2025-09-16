import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/authPages/LoginPage/LoginPage";
import RegisterPage from "./pages/authPages/Register/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/protectedRoutes";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
