import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function Coin() {
    const {id} = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFav, setIsFav] = useState(false); 
    
    const API_KEY = import.meta.env.VITE_API_KEY;

const checkIfFavorite = () => {
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
return favorites.includes(id);
  };

const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFav(!isFav); 
  };


const getCoinDetail = async () => {
    setLoading(true);
    setError(null);

try {
    const res = await fetch(`https://rest.coincap.io/v3/assets/${id}`, {
         headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
    });
if(!res.ok) throw new Error(`Error al obtener detalles: ${res.status}`);
    const data = await res.json();
    setCoin(data.data);
} catch (err) {
    setError(err.message);
    } finally {
      setLoading(false);
    }
  };


useEffect(() => {
    getCoinDetail();
    setIsFav(checkIfFavorite());
}, [id]);

if(loading) return <p>Cargando...</p>
if(error) return <p style={{color:'red'}}>{error}</p>;
if(!coin) return <p>No se encontró informacion sobre la criptomoneda solicitada</p>;

return (
    <div className="coin">
      <img
          src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
          alt={coin.name}
          onError={(e) => (e.target.src = '/logo-default.png')}
          style={{ width: '34px', height: '34px', marginRight: '18px' }}
          />
      <h2>{coin.name} ({coin.symbol})</h2>
      <p><strong>Precio:</strong> ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p><strong>Ranking:</strong> {coin.rank}</p>
      <p><strong>Capitalización de mercado:</strong> ${Number(coin.marketCapUsd).toLocaleString()}</p>
      <p><strong>Volumen 24h:</strong> ${Number(coin.volumeUsd24Hr).toLocaleString()}</p>
      <p><strong>Cambio 24h:</strong> {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>

      <button onClick={toggleFavorite}>
        {isFav ? "Quitar de Favoritos" : "Añadir a Favoritos"}
      </button>
    </div>
  );
}

export default Coin;

