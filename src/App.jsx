import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { LineChart } from "./components/LineChart";

function App() {
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

  const fetchData = async () => {
    console.log({ isLoading });
    setIsLoading(true);
    try {
      const res = await axios.post("https://hpecty.azurewebsites.net/predict", {
        input_data: Object.values(inputGbNums).map((val) => parseFloat(val)),
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
    console.log({ inputGbNums });
  }, [inputGbNums]);

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData();
  };

  const nullArr = [0, 0, 0, 0, 0, 0, 0];

  return (
    <form className="App" onSubmit={onSubmit}>
      <div className="heading">Cloud Storage Prediction</div>

      {data[0] ? (
        <LineChart
          arr1={[...data.filter((_, i) => i < 7)]}
          arr2={[...data.filter((_, i) => i >= 7)]}
        />
      ) : isLoading ? (
        "Loading..."
      ) : (
        <div>
          {Object.keys(inputGbNums).map((day, i) => (
            <div key={day}>
              <input
                value={inputGbNums[day] || ""}
                type="text"
                placeholder={day}
                onChange={(e) =>
                  !isNaN(e.target.value) &&
                  setInputGbNums((prev) => ({
                    ...prev,
                    [day]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
}

export default App;
