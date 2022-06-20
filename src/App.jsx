import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { LineChart } from "./components/LineChart";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    console.log({ isLoading });
    setIsLoading(true);
    try {
      const res = await axios.post("https://hpecty.azurewebsites.net/predict", {
        input_data: [82, 18, 68, 89, 89, 90, 80],
      });

      setData(res.data.output);

      console.log({ data: res.data.output });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading && "Loading..."}
      {data[0] && <LineChart arr={data} />}
    </div>
  );
}

export default App;
