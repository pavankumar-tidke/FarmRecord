import React  from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; 
import Index from './pages/Index.js';

function App() {

  

 

  return (
    <Router>
      <div className="App min-h-screen bg-white dark:bg-slate-900 font-"> 
        <Index />
      </div> 
    </Router>
  );
}


export default App;
