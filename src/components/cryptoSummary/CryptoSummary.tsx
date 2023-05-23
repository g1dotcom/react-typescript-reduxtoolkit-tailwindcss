import { useEffect, useState } from "react";
import { Crypto } from "../../Types";

export type AppProps = {
  crypto: Crypto;
};


export default function CryptoSummary({ crypto }: AppProps): JSX.Element {
const [amount,setAmount] = useState<number>(0);
  useEffect(() => {
    console.log(crypto.name,amount,crypto.current_price*amount);
  })

  return (
    <>
      <p className="my-10">{crypto.name} </p>
      <h1>${crypto.current_price}</h1>
      <input
          className="border-2 border-gray-300 p-2 rounded-lg"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          />
          <p>${(crypto.current_price*amount).toLocaleString(undefined, { minimumFractionDigits: 2 , maximumFractionDigits: 2 })}</p>
    </>
  );
}
