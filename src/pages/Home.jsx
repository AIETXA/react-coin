import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <>
    <h2>Criptomonedas</h2>
    <ul className='criptos'>
      {coins.map((coin) => (
        <li key={coin.id} className='card'>
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
    </>
  );
}

export default Home;
