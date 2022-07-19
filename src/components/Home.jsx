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
      <Button
        className="ButtonSize"
        variant="contained"
        onClick={() => {
          setActiveMenu("MLP");
        }}
      >
        MLP/LSTM
      </Button>
      <Button
        padding="500px"
        variant="contained"
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
