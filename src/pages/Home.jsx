import { useEffect, useState } from 'react';

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const getCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://rest.coincap.io/v3/assets', {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
      if (!res.ok) throw new Error(`Error al traer datos: ${res.status}`);
      const data = await res.json();
      setCoins(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (coins.length === 0) return <p>No se encontraron criptomonedas</p>;

  return (
    <ul>
      {coins.map((coin) => (
        <li key={coin.id}>{coin.name}</li>
      ))}
    </ul>
  );
}

export default Home;
