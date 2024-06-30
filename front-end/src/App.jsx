import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main_page from './pages/main_page/main_page';
import Sign_up from './pages/sign_up/sign_up';
import Login from './pages/login/login';
import Active_email from './pages/email_activate/email_active';
import ProtectedRoute from "./ProtectedRoute"
import { AuthProvider } from './AuthService';


export const IP = "172.17.41.79"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
        <ProtectedRoute><Main_page /></ProtectedRoute>
        } />
        <Route path="/sign_up" element={<Sign_up />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/activate/:protocol/:token" element={<Active_email />} />
      </Routes>
    </AuthProvider>
  );
  
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
