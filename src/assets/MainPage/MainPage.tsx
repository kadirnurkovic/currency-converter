import { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css"

const MainPage = () => {
    
  interface Obj {
    keys: string[];
    values: number[];
  }

  const [currencyData, setCurrencyData] = useState<Obj>({
    keys: [],
    values: [],
  });

  const getData = () => {
    axios
      .get(
        `https://api.fastforex.io/fetch-all?api_key=0f81809aa0-04a2c27ae4-rrovxg`
      )
      .then((res) => {
        console.log(res)
        setCurrencyData({
            keys: Object.keys(res.data.results),
            values: Object.values(res.data.results),
        })
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="list">
        <div>
          <input/>
          <select>
          {currencyData.keys.map((key, index) => (
          <option key={index}>
            {key}
          </option>
        ))}
          </select>
        </div>
        <div>
        <input/>
        <select>
        {currencyData.keys.map((values, index) => (
          <option key={index}>
            {values}
          </option>
        ))}
        </select>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
