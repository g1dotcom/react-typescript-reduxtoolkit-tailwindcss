import { useEffect, useState } from "react";
import axios from "axios";
import CryptoSummary from "../cryptoSummary/CryptoSummary";
import { Crypto } from "../../Types";
import moment from "moment";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AllCoins = () => {

  var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
xhr.send();


  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();

  const [range,setRange] = useState<number>(30);

  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
       display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);

  useEffect(() => {
    if(!selected) return;
    axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${range}&${range === 1 ? "interval=hourly" : "interval=daily"}`
    )
    .then((response) => {
      console.log(response.data);
      setData({
        labels: response.data.prices.map((price: number[]) => {
          return moment.unix(price[0] / 1000).format(range === 1 ? "HH:MM" : "MM-DD");
        }),
        datasets: [
          {
            label: "Dataset 1",
            data: response.data.prices.map((price: number[]) => {
              return price[1];
            }),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
      setOptions({
        responsive: true,
        plugins: {
          legend: {
           display: false,
          },
          title: {
            display: true,
            text: `Price over last ` + range + (range === 1 ? " Day." : " Days ") + ` of ${selected?.name} in USD`,
          },
        },
      })
    });
  },[selected,range])

  return (
    <>
      <div>
        <select
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value);
            setSelected(c);
          
          }}
          defaultValue="default"
        >
          <option value="">Select a coin</option>
          {cryptos
            ? cryptos.map((crypto) => {
                return (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </option>
                );
              })
            : null}
        </select>
        <select onChange={(e)=> {
         setRange(parseInt(e.target.value))
        }} >
            <option value={30} >30 Days</option>
            <option value={7}>7 Days</option>
            <option value={1}>1 Days</option>
        </select>
      </div>
      {selected ? <CryptoSummary crypto={selected} /> : null}
      {data ? (
        <div className="w-[600px]">
          <Line options={options} data={data} />
        </div>
      ) : null}
    </>
  );
};

export default AllCoins;
