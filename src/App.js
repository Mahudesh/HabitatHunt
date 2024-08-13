import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import CBEPage from "./Components/LandingPage";
import AdminLogin from "./Components/OwnerLogin";
import CoimbatorePage from "./Cities/CoimbatorePage";
import ChennaiPage from "./Cities/ChennaiPage";
import Kanyakumaripage from "./Cities/KanyakumariPage";
import AboutUsPage from "./Components/AboutUsPage";
import TanjorePage from './Cities/TanjorePage';
import MaduraiPage from './Cities/MaduraiPage';
import Pondicherrypage from './Cities/PondicherryPage';
import Pricing from './Components/Pricing';
import HouseDetailsCBE from './Cities/HouseDetailsCBE';
import { PropertyProvider } from './Cities/PropertyContext';
import Payment from './Components/Payment';
import HouseDetailsChe from './Cities/HouseDetailsChe';
import Billing from './Components/Billing';
import CityPage from './Cities/CityPage';
import ContactForm from './Components/ContactForm';
import OwnerPage from './Cities/OwnerPage';
import OwnerHouseDetails from './Cities/OwnerHouseDetails';
import AddForm from './Cities/AddForm';
import ForgotPassword from './Components/ForgotPassword';
import AdminDashboard from './Admin/AdminDashboard';
import AdminUsers from './Admin/AdminUsers';
import AdminOwners from './Admin/AdminOwners';


// Create a context for authentication
const AuthContext = createContext();

const App = () => {
  const [auth, setAuth] = useState({ isAuthenticated: false, email: '', userId: null });

  const handleLogin = (email, userId) => {
    setAuth({ isAuthenticated: true, email, userId });
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, email: '', userId: null });
  };
  
  return (
    <div style={{fontFamily: 'Arial, sans-serif'}}>
      <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
        <PropertyProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CBEPage/>} />
              <Route path="/:userId" element={<CBEPage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/SignupPage" element={<Signup />} />
              <Route path="/Ownerlogin" element={<AdminLogin />} />
              <Route path='/ContactForm/:userId' element={<ContactForm/>}/>
              <Route path="/AboutUsPage" element={<AboutUsPage />} />
              <Route path='/Pricing' element={<Pricing/>}/>
              <Route path='/Payment' element={<Payment/>}/>
              <Route path='/Billing' element={<Billing/>}/>
              <Route path="/city/:cityId" element={<CityPage/>} />
              <Route path="/owner-page/:ownerId" element={<OwnerPage/>} />
              <Route path='/owner-house-details/:cityId/:propertyId' element={<OwnerHouseDetails/>}/>
              
                <Route path="/house-details/:cityId/:propertyId" element={<HouseDetailsCBE/>} />     
                <Route path='/AddForm/:ownerId/:cityId' element={<AddForm/>}/>
                <Route path='/admin' element={<AdminDashboard/>}/>  
                <Route path='/adminusers' element={<AdminUsers/>}/>
                <Route path='/adminowners' element={<AdminOwners/>}/>
              
              </Routes>
          </BrowserRouter>
        </PropertyProvider>
      </AuthContext.Provider>
    </div>
  );
};

export { AuthContext, App };
