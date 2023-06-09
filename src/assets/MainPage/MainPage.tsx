import { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css";
import { Button } from '@nextui-org/react';

interface Obj {
  values: (string | number)[][];
}

const MainPage = () => {
  
  const [currencyData, setCurrencyData] = useState<Obj>({
    values: [],
  });
  const [check, setCheck] = useState(1);
  const [currency, setCurrency] = useState("");
  const [firstValue, setFirstValue] = useState(1)
  const [value, setValue] = useState<number>(1);
  const [currencyValue, setCurrencyValue] = useState(1);
  const [initialCurrencyValue, setInitialCurrencyValue] = useState<number>(0);
  const [resultOfConvert, setResultOfConvert] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState(0);

  const getData = () => {
    axios
      .get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=8NztjPGOhtlwR8meov9g5DE6Rw5nFNKySD3BDpq9`
      )
      .then((res) => {
        console.log(res);
        setCurrencyData({
          values: Object.entries(res.data.results),
        });
        setFirstValue(+res.data.results['AED']);
        setResultOfConvert(+res.data.results['AED']);  
      });
  };

  console.log(currencyData)

  useEffect(() => {
    getData();
    setInitialCurrencyValue(
      +((1 / firstValue) * value * resultOfConvert).toFixed(2)
    )
  }, []);

  console.log(initialCurrencyValue)

  return (
    <div className="main">
      <div className="list">
        <div className='font'>Currency converter</div>
        <div className="inputContainer">
          <input
            onChange={(e) => {
              setValue(isNaN(+e.target.value) ? 1 : +e.target.value);
            }}
            value={value}
          ></input>
          <select
            className="selection"
            onChange={(e) => {
              setCurrencyValue(+e.target.value);
            }}
          >
            {currencyData.values.map((key, index) => (
              <option key={index} value={key[1]}>
                {key[0]}
              </option>
            ))}
          </select>
        </div>
        <div className="outputContainer">
          <input value={initialCurrencyValue} disabled className="input-div"/>
          <select
            className="selection"
            onChange={(e) => {
              setResultOfConvert(+e.target.value),
                setCurrentCurrency(+e.target.value);
            }}
          >
            {currencyData.values.map((values, index) => (
              <option key={index} value={values[1]}>
                {values[0]}
              </option>
            ))}
          </select>
        </div>
        <Button color='primary' size='sm' auto ghost
          onClick={() => {
            setInitialCurrencyValue(
              +((1 / currencyValue) * value * resultOfConvert).toFixed(2)
            );
            console.log(initialCurrencyValue)
          }}
        >
          Convert
        </Button>
      </div>
    </div>
  );
};

export default MainPage;

// 1 /
