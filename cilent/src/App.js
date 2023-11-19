import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { AuthProvider,useAuth } from './Component/AuthContext';
import UploadPdf from './Component/UploadPdf';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Home from './Component/Home';
import Extractedpdf from './Component/Extractedpdf';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/uploadpdf" element={<ProtectedRoute />} />
            <Route path='/Extracted' element = {<Extractedpdf/>}/>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <UploadPdf />;
};

export default App;
