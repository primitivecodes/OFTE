import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Modules from './components/Modules';
import Payments from './components/Payments';
import Portfolio from './components/Portfolio';
import Submissions from './components/Submissions';
import Certificates from './components/Certificates';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/portfolio" element={<Portfolio />} />

        {/* Admin routes */}
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
    </Router>
  );
}

export default App;
