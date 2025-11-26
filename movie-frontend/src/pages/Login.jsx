import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8081/users/search/findByEmail?email=${email}`);
      const userData = res.data;

      if (userData && userData.password === password) {
        const selfLink = userData._links.self.href;
        const id = selfLink.substring(selfLink.lastIndexOf('/') + 1);
        setUser({ ...userData, id: id });
        navigate('/dashboard');
      } else {
        alert("Mauvais mot de passe");
      }
    } catch (err) {
      alert("Utilisateur non trouvé");
    }
  };

  return (
    // 👇 C'est ici que la magie opère : "center-screen"
    <div className="app-container center-screen">
      <h1 style={{ marginBottom: '20px' }}>🎬 Movie App</h1>
      <h2>Connexion</h2>
      
      <form onSubmit={handleLogin} className="auth-form">
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Se connecter</button>
      </form>
      
      <p>Pas de compte ? <Link to="/register">Créer un compte</Link></p>
    </div>
  );
}

export default Login;