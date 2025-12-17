import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, setUser }) {
    const [recommendations, setRecommendations] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // 1. Charger les recommandations
    useEffect(() => {
        const fetchRecos = async () => {
            try {
                // IMPORTANT: préfixe /recommendation-service/
                const res = await axios.get(`http://localhost:8080/recommendation-service/recommend/${user.id}`);
                const allMovies = res.data.recommendations.flatMap(r => r.Search || []);
                setRecommendations(allMovies);
            } catch (err) {
                console.error("Erreur recommandations:", err);
            }
        };

        if (user?.id) {
            fetchRecos();
        }
    }, [user.id]);

    // 2. Recherche globale
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // IMPORTANT: préfixe /movie-service/
            const res = await axios.get(`http://localhost:8080/movie-service/movies/search?query=${searchTerm}`);
            setSearchResults(res.data.Search || []);
        } catch (err) {
            console.error("Erreur recherche:", err);
        }
    };

    // 3. Déconnexion
    const handleLogout = () => {
        setUser(null); // Fonctionne maintenant car reçue en props
        navigate('/login');
    };

    return (
        <div className="app-container">
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#1a1a1a',
                color: 'white',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h1>Cinéma de {user?.name} 👋</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#e50914',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Déconnexion
                </button>
            </header>

            <section>
                <h2>🌟 Recommandé pour vous</h2>
                <div className="movie-grid">
                    {recommendations.length > 0 ? (
                        recommendations.map((movie, index) => (
                            <MovieCard key={`reco-${index}`} movie={movie} />
                        ))
                    ) : (
                        <p>Aucune recommandation.</p>
                    )}
                </div>
            </section>

            <hr style={{ margin: '40px 0', borderColor: '#333' }} />

            <section>
                <h2>🔍 Explorer</h2>
                <form onSubmit={handleSearch} className="search-box" style={{ marginBottom: '30px' }}>
                    <input
                        type="text"
                        placeholder="Chercher un film..."
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ padding: '10px', width: '300px' }}
                    />
                    <button type="submit">Chercher</button>
                </form>

                <div className="movie-grid">
                    {searchResults.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function MovieCard({ movie }) {
    if (!movie) return null;
    return (
        <div className="movie-card">
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}
                alt={movie.Title}
            />
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </div>
        </div>
    );
}

export default Dashboard;