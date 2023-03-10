import { fontFamily, fontStyle } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

import { LineChart } from "./LineChart";
import Plot from "./Plot";

function MLP() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(0);
  const [inputGbNums, setInputGbNums] = useState({
    Monday: 86,
    Tuesday: 88,
    Wednesday: 83.5,
    Thursday: 87,
    Friday: 88,
    Saturday: 89,
    Sunday: 86,
  });

  const [model, setModel] = useState("MLP"); // MLP | LSTM

  const fetchData = async () => {
    console.log({ isLoading });
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://hpe-cty.azurewebsites.net/predict?model=${model}`,
        {
          input_data: Object.values(inputGbNums).map((val) => parseFloat(val)),
        }
      );
      console.log(inputGbNums);
      // console.log(Object.keys(inputGbNums)[0].values(inputGbNums).map((val) => parseFloat(val)))

      setData(res.data.output.forecast);
      setUserType(res.data.output.user_type);

      console.log({ data: res.data.output.forecast });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log({ inputGbNums });
  }, [inputGbNums]);

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData();
  };

  const nullArr = [0, 0, 0, 0, 0, 0, 0];

  return (
    
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Model"
        onChange={(e) => setModel(e.target.value)}
      />
      

      <Plot data={data} inputGbNums={inputGbNums} isLoading={isLoading} />
      <div style={{
          color:"black",
          fontWeight:"bold",
          fontSize:"20px"
        }} > User Type - {userType}</div>
    </form>
  );
}

export default MLP;
