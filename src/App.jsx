import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import TaskDashboard from "./pages/TaskDashboard";
import TaskDetails from "./pages/TaskDetails";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskBoard from "./pages/TaskBoard";
import TermsAndConditions from "./pages/TermsAndConditions";
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <TaskDashboard />
              </ProtectedRoute>
            }
          />
<Route
    path="/tasks/:id"
    element={
        <ProtectedRoute>
            <TaskDetails />
        </ProtectedRoute>
    }
/>


        </Routes>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}
