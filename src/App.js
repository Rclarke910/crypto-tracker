import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
  axios
  .get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
  .then(res => {
    setCoins(res.data);
  })
  .catch(error => console.log(error));
}, []);
const handleChange = e => {
  setSearch(e.target.value)
}
const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
    <h1 className = 'app__header--title'>Today In Crypto</h1>
    <img src="src/Crypto-img.png" className='app__header--img'/>
    <form>
      <input type='textarea' className = 'app__searchbar--bar' placeholder="Search For A Coin" onChange = {handleChange}/>
      </form>
        {filteredCoins.map(coin => {
          return ( <Coin key={coin.id} 
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol} 
            price={coin.current_price} 
            volume={coin.total_volume} 
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}/>);
        })}
    </div>
  )
}

export default App
