import { useEffect, useState } from "react";
import axios from "axios";
import CryptoSummary from "../cryptoSummary/CryptoSummary";
import { Crypto } from "../types/Types";

const AllCoins = () => {
  const [cryptos, setCryptos] = useState<Crypto[] | null>([]);

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);

  return (
    <div>
      {cryptos
        ? cryptos.map((crypto) => {
            return <CryptoSummary crypto={crypto} />;
          })
        : null}
    </div>
  );
};

export default AllCoins;
