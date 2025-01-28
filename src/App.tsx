import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Truck, CreditCard, LayoutDashboard, FileSpreadsheet } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Requirements from './pages/Requirements';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-indigo-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <Truck className="w-8 h-8" />
                <span className="font-bold text-xl">BIGLINE </span>
              </div>
              <div className="flex space-x-6">
                <Link to="/" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/requirements" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                  <FileSpreadsheet className="w-5 h-5" />
                  <span>Requirements</span>
                </Link>
                <Link to="/payment" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;