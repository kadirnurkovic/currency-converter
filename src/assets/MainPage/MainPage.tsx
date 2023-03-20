import { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css"

const MainPage = () => {
    
  interface Obj {
    keys: any[];
    values: any[];
  }

  const [currencyData, setCurrencyData] = useState<Obj>({
    keys: [],
    values: [],
  });
  const [check, setCheck] = useState(1)
  const [currency, setCurrency] = useState('')
  const [currencyValue, setCurrencyValue] = useState(1);
  const [initialCurrencyValue, setInitialCurrencyValue] = useState(1);
  const [resultOfConvert, setResultOfConvert] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = () => {
    axios
      .get(
        `https://api.fastforex.io/fetch-all?api_key=0f81809aa0-04a2c27ae4-rrovxg`
      )
      .then((res) => {
        console.log(res)
        setCurrencyData({
            keys: Object.entries(res.data.results),
            values: Object.entries(res.data.results),
        })
      });
  };
  let amount: number | undefined;
  const currencyConvertion = (e: number) => {

  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="list">
        <div>
          <input onChange={(e) => {e.preventDefault; setInitialCurrencyValue(isNaN(e.target.value) ? 1 : +e.target.value )}} value={initialCurrencyValue}></input>
          {console.log(initialCurrencyValue)}
          <select className="selection">
          {currencyData.keys.map((key, index) => (
          <option key={index} value={key[0]}>
            
            {key[1]}
          </option>
        ))}
          </select>
        </div>
        <div>
        <input value={resultOfConvert * initialCurrencyValue}/>
        <select className="selection" onChange={(e) => {setResultOfConvert(e.target.value)}}>
        {currencyData.values.map((values, index) => (
          <option key={index} value={values[1]}>
            {values[0]}
            {console.log(values[0])}
          </option>
        ))}
        </select>
        </div>
        <button onClick={() => {}}>Convert</button>
      </div>
    </div>
  );
};

export default MainPage;
