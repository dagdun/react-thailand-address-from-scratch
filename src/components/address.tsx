import React, { useState } from "react";
import {
  searchAddressByDistrict,
  searchAddressByAmphoe,
  searchAddressByProvince,
  searchAddressByZipcode,
} from "thai-address-database";
import { AddressIf } from "../types";

function App({ address }: { address: AddressIf }) {
  const [addressState, setAddress] = useState<AddressIf>(address);
  const [autoComplete, setAutoComplete] = useState<AddressIf[]>([]);

  const handleInput = (field: string, search: string) => {
    let items: AddressIf[] = [];
    if (field === "district") {
      items = searchAddressByAmphoe(search);
      setAddress({ ...addressState, [field]: search });
    } else if (field === "amphoe") {
      items = searchAddressByDistrict(search);
      setAddress({ ...addressState, [field]: search });
    } else if (field === "province") {
      items = searchAddressByProvince(search);
      setAddress({ ...addressState, [field]: search });
    } else if (field === "zipcode") {
      items = searchAddressByZipcode(search);
      setAddress({ ...addressState, [field]: search });
    }
    setAutoComplete(items);
  };

  const fillAddress = (addr: AddressIf) => {
    setAddress(addr);
    setAutoComplete([]);
  };

  return (
    <div>
      ตำบล <br />
      <input
        value={addressState.district}
        onChange={(e) => handleInput("district", e.target.value)}
      />
      <br />
      อำเภอ <br />
      <input
        value={addressState.amphoe}
        onChange={(e) => handleInput("amphoe", e.target.value)}
      />
      <br />
      จังหวัด <br />
      <input
        value={addressState.province}
        onChange={(e) => handleInput("province", e.target.value)}
      />
      <br />
      รหัสไปรษณีย์ <br />
      <input
        value={addressState.zipcode}
        onChange={(e) => handleInput("zipcode", e.target.value)}
      />
      <br />
      {autoComplete.length > 0 && (
        <div className="auto-complete">
          {autoComplete.map((item: AddressIf, i: number) => (
            <div
              className="auto-complete-item"
              key={i}
              onClick={() => fillAddress(item)}
            >
              {item.district} | {item.amphoe} | {item.province} | {item.zipcode}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
