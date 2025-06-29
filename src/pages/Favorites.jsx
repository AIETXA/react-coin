
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

      try {
        const res = await fetch('https://rest.coincap.io/v3/assets', {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const data = await res.json();
        setAllCoins(data.data);
        const filtered = data.data.filter(coin => storedFavorites.includes(coin.id));
        setFavorites(filtered);
      } catch (error) {
        console.error("Error al traer datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando favoritos...</p>;
  if (favorites.length === 0) return <p>No hay criptomonedas favoritas.</p>;

  return (
    <ul>
      {favorites.map(coin => (
        <li key={coin.id}>
          <Link to={`/coin/${coin.id}`}>
          <img
          src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
          alt={coin.name}
          onError={(e) => (e.target.src = '/logo-default.png')}
          style={{ width: '24px', height: '24px', marginRight: '8px' }}
          />
          {coin.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Favorites;
