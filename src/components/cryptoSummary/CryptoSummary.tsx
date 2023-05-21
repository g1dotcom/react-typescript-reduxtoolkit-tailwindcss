import { Crypto } from "../allCoins/AllCoins";

export type AppProps = {
  crypto: Crypto;
};

export default function CryptoSummary({ crypto }: AppProps): JSX.Element {
  return <p>{crypto.name}</p>;
}
