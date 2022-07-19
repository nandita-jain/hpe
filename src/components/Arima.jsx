import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { LineChart } from "./LineChart";
import Plot from "./Plot";

const Arima = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputGbNums, setInputGbNums] = useState({
    Monday: 86,
    Tuesday: 88,
    Wednesday: 83.5,
    Thursday: 87,
    Friday: 88,
    Saturday: 89,
    Sunday: 86,
  });
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const fetchData = async (e) => {
    e.preventDefault();
    console.log({ isLoading });
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await axios.post(
        "https://hpe-cty.azurewebsites.net/predict/upload?model=ARIMA",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(res.data.output);

      console.log({ data: res.data.output });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={fetchData}>
      {!isLoading && (
        <div>
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            style={{
              margin: "50px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",

              padding: "5px",
            }}
          >
            Submit
          </button>
        </div>
      )}
      <Plot hide data={data} inputGbNums={inputGbNums} isLoading={isLoading} />
    </form>
  );
};

export default Arima;
