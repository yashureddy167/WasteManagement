import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import { SignUp } from "./Components/SignUp";
import Layout from "./Components/Layout";
import QRScanner from "./Components/QRScanner";
import MainScreen from "./Components/MainScreen";
import { ForgotPassword } from "./Components/ForgotPassoword";
import { UserProvider } from "./Contexts/UserContext";
import "./App.css";
import Redeem from "./Components/Redeem";
import AddVoucher from "./Components/AddVoucher";
import ChangePassword from "./Components/ChangePassword";
import Profile from "./Components/profile";
import UpdateOrDeleteVoucher from "./Components/UpdateOrDeleteVoucher";

function App() {
  return (
    <div className="app-container">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<SignIn />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="qr-scanner-screen" element={<QRScanner />} />
              <Route path="main-screen" element={<MainScreen />} />
              <Route path="redeem" element={<Redeem />} />
              <Route path="add-voucher" element={<AddVoucher />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="profile" element={<Profile />} />
              <Route
                path="upadate-Delete-vouchers"
                element={<UpdateOrDeleteVoucher />}
              />
              {/* Add other routes here */}
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
