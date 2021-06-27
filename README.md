# react-thailand-address-from-scratch

ขั้นตอนการใช้งานที่อยู่ประเทศไทยแบบเข้าใจง่าย(รึเปล่า) เพื่อคุณสามารถปรับแต่ง style และใช้ design framework ที่คุณใช้อยู่ โดยไม่ต้อง override style ของ lib นี้ (เพราะไม่มี style)

โดยใช้ lib [thai-address-database](https://github.com/Sellsuki/thai-address-database "thai-address-database")

คำสั่ง

```
yarn && yarn start
```

## อธิบายโค้ด

### Step 1

เริ่มจากสร้าง input ขึ้นมา และใส่ `value`, `onChange` ให้เรียบร้อย

```javascript
import React, { useState } from "react";
import { AddressIf } from "../types";

const Address = () => {
  const [addressState, setAddress] = useState < AddressIf > address;
  const handleInput = (field: string, search: string) => {
    console.log(search); // "province", นคร
  };

  return (
    <>
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
    </>
  );
};
```

![](https://raw.githubusercontent.com/dagdun/react-thailand-address-from-scratch/main/images/1.png)

### Step 2

จากนั้นให้ใส่ function `handleInput` เข้าไป

```javascript
...
import {
  searchAddressByDistrict,
  searchAddressByAmphoe,
  searchAddressByProvince,
  searchAddressByZipcode,
} from "thai-address-database";
...

function Address() {
  const [addressState, setAddress] = useState<AddressIf>(address);

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
	console.log(items): // [{"district": "ชื่อตำบล", "amphoe": "ชื่ออำเภอ", "province": "ชื่อจังหวัด", "zipcode":"รหัสไปรษณีย์"}, { ... }, { ... }]
  };

  return (
    ...
  );
}

```

### Step 3

ต่อมา ให้เราเอา `items` ที่ได้ ไปใส่ใน state (ในที่นี้ lib จะ return มาให้เรา 20 items)
และนำไปวน auto complete

```javascript
function App({ address }: { address: AddressIf }) {
  ...
  const [autoComplete, setAutoComplete] = useState<AddressIf[]>([]);

  const handleInput = (field: string, search: string) => {
    let items: AddressIf[] = [];
	if (field === "district") {
    ...
	}
    setAutoComplete(items);
  };

  return (
    <div>
      ....
      {autoComplete.length > 0 && (
        <div className="auto-complete">
          {autoComplete.map((item: AddressIf, i: number) => (
            <div
              className="auto-complete-item"
              key={i}
            >
              {item.district} | {item.amphoe} | {item.province} | {item.zipcode}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

![](https://raw.githubusercontent.com/dagdun/react-thailand-address-from-scratch/main/images/2.png)

### Step 4

ขั้นตอนสุดท้ายคือการคลิ๊ก auto complete แล้วให้ไปค่าที่อยู่ไปใส่ใน input หรือการ set state ให้ `addressState` นั่นเอง เป็นอันเรียบร้อย
หลังจากคลิ๊ก อย่าลืมเคลียร์ `autoComplete` ให้ว่างเปล่าด้วย

```javascript
function App({ address }: { address: AddressIf }) {
  ...
  const handleInput = (field: string, search: string) => {
    ...
  }

  const fillAddress = (addr: AddressIf) => {
    setAddress(addr);
    setAutoComplete([]);
  };

  return (
    <div>
      ....
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
```

![](https://raw.githubusercontent.com/dagdun/react-thailand-address-from-scratch/main/images/3.png)
