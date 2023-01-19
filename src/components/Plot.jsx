import React from "react";
import { LineChart } from "./LineChart";

const Plot = ({ data, inputGbNums, hide, isLoading, userData }) => {
  return (
    <div>
      {data && data[0] ? (
        <LineChart
          arr1={[...data.filter((_, i) => i < 7)]}
          arr2={[...data.filter((_, i) => i >= 7)]}
        />
      ) : isLoading ? (
        "Loading..."
      ) : (
        <div>
          {!hide &&
            Object.keys(inputGbNums).map((day, i) => (
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
          {!hide && <button type="submit">Submit</button>}
        </div>
      )}
      
    </div>
  );
};

export default Plot;
