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
      await axios.post('http://localhost:8081/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        favorites: favoritesArray
      });
      alert("Compte créé ! Connectez-vous.");
      navigate('/login');
    } catch (err) {
      alert("Erreur lors de la création.");
    }
  };

  return (
    // 👇 Ajout de "center-screen" ici aussi
    <div className="app-container center-screen">
      <h1 style={{ marginBottom: '20px' }}>🎬 Rejoignez-nous</h1>
      <h2>Créer un compte</h2>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" placeholder="Nom" onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Mot de passe" onChange={e => setFormData({...formData, password: e.target.value})} required />
        <input type="text" placeholder="Genres favoris (ex: Batman, Shrek)" onChange={e => setFormData({...formData, favorites: e.target.value})} required />
        <button type="submit">S'inscrire</button>
      </form>
      
      <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
    </div>
  );
}

export default Register;