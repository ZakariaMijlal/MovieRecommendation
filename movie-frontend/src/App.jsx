import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import './App.css';

function App() {
  // On stocke l'utilisateur connecté ici (State global simple)
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* On passe la fonction setUser au Login pour qu'il puisse enregistrer l'utilisateur */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        
        <Route path="/register" element={<Register />} />
        
        {/* On protège la route Dashboard : si pas de user, on redirige vers login */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;