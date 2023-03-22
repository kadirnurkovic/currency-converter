import { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css"

const MainPage = () => {
    
  interface Obj {
    keys: any[];
    values: (string | number)[];
  }

  const [currencyData, setCurrencyData] = useState<Obj>({
    keys: [],
    values: [],
  });
  const [check, setCheck] = useState(1)
  const [currency, setCurrency] = useState('')
  const [value, setValue] = useState(1);
  const [currencyValue, setCurrencyValue] = useState(1);
  const [initialCurrencyValue, setInitialCurrencyValue] = useState();
  const [resultOfConvert, setResultOfConvert] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState(0)

  

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
        console.log(currencyData.values)
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
          <input onChange={(e) => {e.preventDefault; setValue(isNaN(e.target.value) ? 1 : (+e.target.value) )}} value={value}></input>
          {console.log(initialCurrencyValue)}
          <select className="selection" onChange={(e) => {setCurrencyValue(e.target.value)}}>
          {currencyData.values.map((key, index) => (
          <option key={index} value={key[1]}>
             {console.log(key)}
            {key[0]}
          </option>
        ))}
          </select>
        </div>
        <div>
        <input value={initialCurrencyValue}/>
        <select className="selection" onChange={(e) => {setResultOfConvert(e.target.value) , setCurrentCurrency(e.target.value)} }>
        {currencyData.values.map((values, index) => (
          <option key={index} value={values[1]}>
            {values[0]}
          </option>
        ))}
        </select>
        </div>
        <button onClick={() => {setInitialCurrencyValue(((1 / currencyValue) * value) * resultOfConvert)}}>Convert</button>
      </div>
    </div>
  );
};

export default MainPage;

// 1 / 
