import React, { useState } from "react";
import Button from "@mui/material/Button";
import Arima from "./Arima";
import MLP from "./MLP";
import "./Home.css";
const Home = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [user, addUser] = useState(1);
  return (
    <>
      <div className="heading">Cloud Storage Prediction</div>
      <Button
        className="ButtonSize"
        variant="contained"
        style={{
          backgroundColor: "green",
          color: "white",
          marginRight: "100px",
          // marginLeft: "150px",
          padding: "10px",
        }}
        onClick={() => {
          setActiveMenu("MLP");
        }}
      >
        MLP / LSTM
      </Button>
      <Button
        padding="500px"
        variant="contained"
        style={{
          marginLeft: "100px",
          //marginRight: "150px",
          padding: "10px",
        }}
        onClick={() => {
          setActiveMenu("ARIMA");
        }}
      >
        ARIMA
      </Button>
      {activeMenu === "ARIMA" && <Arima />}
      {activeMenu === "MLP" && <MLP />}
    </>
  );
};

export default Home;
