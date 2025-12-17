import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', favorites: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const favoritesArray = formData.favorites.split(',').map(s => s.trim());

    try {
      await axios.post('http://localhost:8080/user-service/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        favorites: favoritesArray
      });
      alert("Compte créé !");
      navigate('/login');
    } catch (err) {
      alert("Erreur lors de la création.");
    }
  };

  return (
      <div className="app-container center-screen">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="text" placeholder="Nom" onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Mot de passe" onChange={e => setFormData({...formData, password: e.target.value})} required />
          <input type="text" placeholder="Favoris (ex: Inception, Toy Story)" onChange={e => setFormData({...formData, favorites: e.target.value})} required />
          <button type="submit">S'inscrire</button>
        </form>
        <Link to="/login">Retour</Link>
      </div>
  );
}

export default Register;