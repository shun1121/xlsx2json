import React, { useState } from "react";
const XLSX = require("xlsx");

type Type = {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        h: string;
        r: string;
        t: string;
        v: string;
        w: string;
      };
    };
  };
}

export const Popup: React.VFC = () => {
  const [workbook, setWorkbook] = useState<Type>({});
  const [sheetNumber, setSheetNumber] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [value, setValue] = useState("")
  const [sheetList, setSheetList] = useState([])
  const [data, setData] = useState("");

  const sheet_number = [
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
  ]

  const handleReadFile = async (fileObject: File | null) => {
    if (fileObject) {
      const buffer = await fileObject.arrayBuffer();
      await setWorkbook(XLSX.read(buffer));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileObject: File | null = e.currentTarget.files![0]
    handleReadFile(fileObject);
  };

  // const chooseSheet = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const Sheet = "Sheet" + e.target.value;
  //   console.log(typeof e.target.value)
  //   console.log(Sheet)
  //   setSheetNumber(Sheet);
  // };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sheet_list: any = workbook.SheetNames
    setSheetList(sheet_list.length)
    console.log("↓")
    console.log(sheet_list.length)
    console.log(workbook)
    console.log(e.target.value)
    setSheetNumber("Sheet" + e.target.value)
  }
  console.log(sheetNumber)

  const chooseCell = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cell = e.target.value;
    const selected_cell = cell[0].toUpperCase() + cell.slice(1);
    console.log(typeof cell.slice(1))
    console.log(selected_cell)
    if (selected_cell) {
      setCellNumber(selected_cell);
    } else {
      console.log('input value is undefined')
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(workbook);
    console.log(workbook.Sheets);
    const Sheet = workbook.Sheets[sheetNumber];
    console.log(Sheet)
    const targetCell = Sheet[cellNumber].v;
    setData(targetCell);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        {/* <label>
          sheet number:
          <input type="text" onChange={chooseSheet} />
        </label> */}
        <select value={sheetNumber} onChange={handleSelect}>
          <option value="">選択してください</option>
          {sheet_number.map(option => (
            <option key={option[0]} value={option[0]}>{option[1]}</option>
          ))}
          {/* <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option> */}
        </select>
        <div>
          <label>
            choose cell:
            <input type="text" onChange={chooseCell} />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      {data ? <div>{`シート1のセル${cellNumber}の値：\n${data}`}</div> : <></>}
    </div>
  );
};
