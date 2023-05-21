import { Crypto } from "../../Types";

export type AppProps = {
  crypto: Crypto;
};

export default function CryptoSummary({ crypto }: AppProps): JSX.Element {
  return (
    <>
      {" "}
      <p>{crypto.name} </p>
      <img src={crypto.image} alt="" />
    </>
  );
}
