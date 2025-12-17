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
      // Appel via Gateway (8080) + Préfixe du service (/user-service)
      const res = await axios.get(`http://localhost:8080/user-service/users/search/findByEmail?email=${email}`);
      const userData = res.data;

      if (userData && userData.password === password) {
        const selfLink = userData._links.self.href;
        const id = selfLink.substring(selfLink.lastIndexOf('/') + 1);
        setUser({ ...userData, id: id });
        navigate('/dashboard');
      } else {
        alert("Identifiants incorrects");
      }
    } catch (err) {
      alert("Erreur : Vérifiez que la Gateway et Eureka sont lancés.");
    }
  };

  return (
      <div className="center-screen">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Entrer</button>
        </form>
        <p>Pas de compte ? <Link to="/register">S'inscrire</Link></p>
      </div>
  );
}
export default Login;