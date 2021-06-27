import React from "react";
import Address from "./components/address";
import { AddressIf } from "./types";
import "./App.css";

function App() {
  const dataFromDB: AddressIf = {
    district: "แก้ไขตำบล",
    amphoe: "",
    province: "",
    zipcode: "",
  };
  return (
    <div>
      <Address address={dataFromDB} />
    </div>
  );
}

export default App;
