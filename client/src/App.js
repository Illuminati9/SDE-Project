import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./pages/homepage";
import Navbar from "./components/universal/Navbar";
import Auth from "./pages/auth";
import Footer from "./components/universal/Footer";
import Services from "./pages/services";
import OpenRoute from "./components/core/auth/OpenRoute";
import PrivateRoute from './components/core/auth/PrivateRoute'
import OTP from "./pages/otp";
import Error from "./pages/error";
import { Dashboard } from "./pages/dashboard";
import Providers from "./components/core/providers/providers";
import NewProvider from "./components/core/providers/provider/newProvider";
import ProviderDetails from "./components/core/providerDetails/providerDetails";

function App() {

  return (
    <div className="App font-Montserrat">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/auth"
          element={
            <OpenRoute>
              <Auth />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <OTP />
            </OpenRoute>
          }
        />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>
        <Route path='/providers/:id' element={
          <PrivateRoute>
            <Providers/>
          </PrivateRoute>
        }/>
        <Route path='/providers/provider/:id' element={
          <PrivateRoute>
            <ProviderDetails/>
          </PrivateRoute>
        }/>
         <Route path='/create-provider' element={
          <PrivateRoute>
            <NewProvider/>
          </PrivateRoute>
        }/>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
