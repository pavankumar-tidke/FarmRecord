import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BottomNavbar from './components/BottomNavbar'; 
import TopNav from './components/TopNav';
import Dashboard from './pages/user/Dashboard/Index';
import ViewWork from './pages/user/ViewWork/Index';
import AddWork from './pages/user/AddWork/Index';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-white dark:bg-slate-900 overflow-y-hidden"> 
        <TopNav />
        <div className="px-2 ">
          <Routes>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/aw" element={<AddWork />} /> 
            <Route path="/vw" element={<ViewWork />} /> 
          </Routes>
        </div>
        <BottomNavbar />
      </div> 
    </Router>
  );
}

export default App;
