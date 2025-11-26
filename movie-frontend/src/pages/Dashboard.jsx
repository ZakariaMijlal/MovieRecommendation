import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ user }) {
  const [recommendations, setRecommendations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Charger les recommandations au démarrage
  useEffect(() => {
    const fetchRecos = async () => {
      try {
        // Appel au Recommendation-Service (8083)
        const res = await axios.get(`http://localhost:8083/recommend/${user.id}`);
        // Le format reçu est { user: ..., recommendations: [ {Search: []}, {Search: []} ] }
        // On doit aplatir les tableaux pour avoir une seule liste de films
        const allMovies = res.data.recommendations.flatMap(r => r.Search || []);
        setRecommendations(allMovies);
      } catch (err) {
        console.error("Erreur reco:", err);
      }
    };
    fetchRecos();
  }, [user.id]);

  // 2. Fonction de recherche globale (Movie-Service 8082)
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8082/movies/search?query=${searchTerm}`);
      setSearchResults(res.data.Search || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Bonjour, {user.name} 👋</h1>
        <button onClick={() => window.location.reload()} style={{backgroundColor: '#dc3545'}}>Déconnexion</button>
      </header>

      {/* SECTION 1: RECOMMANDATIONS */}
      <section>
        <h2>🌟 Recommandé pour vous (basé sur : {user.favorites.join(', ')})</h2>
        <div className="movie-grid">
          {recommendations.length > 0 ? recommendations.map((m, index) => (
            <MovieCard key={index} movie={m} />
          )) : <p>Aucune recommandation trouvée.</p>}
        </div>
      </section>

      <hr style={{margin: '40px 0'}}/>

      {/* SECTION 2: TOUS LES FILMS */}
      <section>
        <h2>🔍 Chercher tous les films</h2>
        <form onSubmit={handleSearch} className="search-box">
          <input type="text" placeholder="Avengers, Titanic..." onChange={e => setSearchTerm(e.target.value)} />
          <button type="submit">Chercher</button>
        </form>
        <div className="movie-grid">
          {searchResults.map((m) => (
            <MovieCard key={m.imdbID} movie={m} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Petit composant pour afficher une carte de film
function MovieCard({ movie }) {
    if(!movie) return null;
    return (
        <div className="movie-card">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'} alt={movie.Title} />
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </div>
        </div>
    )
}

export default Dashboard;