import React, { useState } from "react";
import { useInputState } from "@mantine/hooks";
import { TextInput, NumberInput, NativeSelect } from "@mantine/core";
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
};

export const Popup: React.VFC = () => {
  const [workbook, setWorkbook] = useState<Type>({});
  const [sheetNumber, setSheetNumber] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [value, setValue] = useState("");
  const [sheetList, setSheetList] = useState([]);
  const [data, setData] = useState("");

  // const sheet_number = [
  //   ["1", 1],
  //   ["2", 2],
  //   ["3", 3],
  //   ["4", 4],
  //   ["5", 5],
  // ];

  const handleReadFile = async (fileObject: File | null) => {
    if (fileObject) {
      const buffer = await fileObject.arrayBuffer();
      await setWorkbook(XLSX.read(buffer));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileObject: File | null = e.currentTarget.files![0];
    handleReadFile(fileObject);
  };

  // const chooseSheet = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const Sheet = "Sheet" + e.target.value;
  //   console.log(typeof e.target.value)
  //   console.log(Sheet)
  //   setSheetNumber(Sheet);
  // };

  // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   // const sheet_list: any = workbook.SheetNames;
  //   // setSheetList(sheet_list.length);
  //   console.log(workbook);
  //   setValue(e.target.value);
  //   setSheetNumber("Sheet" + e.target.value);
  // };

  const chooseCell = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cell = e.target.value;
    console.log(cell[0]);
    const selected_cell = cell[0].toUpperCase() + cell.slice(1);
    console.log(selected_cell);
    // if (selected_cell !== undefined) {
      setCellNumber(selected_cell);
    // } else {
    //   console.log("input value is undefined");
    // }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(workbook);
    console.log(workbook.Sheets);
    if (workbook.Sheets[sheetNumber] !== undefined) {
      const Sheet = workbook.Sheets[sheetNumber];
      console.log(Sheet);
      if (Sheet[cellNumber] !== undefined) {
        const targetCell = Sheet[cellNumber].v;
        setData(targetCell);
      } else {
        console.log('cannot find the value in the cell')
      }
    } else {
      console.log('cannot find the sheet')
    }
  };

  // const arr = ["1", "2", "3", "4", "5"];
  // const SheetNum = () => {
  //   return (
  //     <NativeSelect
  //       value={value}
  //       label="シート番号"
  //       onChange={handleSelect}
  //       placeholder="選択してください"
  //       data={arr}
  //     />
  //   );
  // };

  const SelectSheet = () => {
    return <NumberInput label="シート番号" value={Number(value)} onChange={(val:number) => {
      console.log(sheetNumber)
      setValue(val.toString());
      setSheetNumber("Sheet" + val.toString());
    }} />;
  }

  // const CellNum = () => {
  //   const [val, setVal] = useState("");
  //   console.log(val);
  //   return (
  //     <TextInput
  //       placeholder="セル番号"
  //       label="セル番号を入力してください"
  //       value={val}
  //       onChange={(event) => setVal(event.currentTarget.value)}
  //     />
  //   );
  // };

  // function Demo() {
  //   const [value, setValue] = useState('');
  //   return <Select value={value} onChange={setValue} data={[]} />;
  // }

  // const SelectBox = () => {
  //   const [value, setValue] = useState<string | null>("");
  //   console.log(value);
  //   const set_value = () => {
  //     // setValue(arr)
  //     console.log(value);
  //     console.log("Sheet" + value);
  //   };
  //   return (
  //     <Select
  //       value={value}
  //       onChange={setValue}
  //       data={arr}
  //     />
  //   );
  // };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        {/* <label>
          sheet number:
          <input type="text" onChange={chooseSheet} />
        </label> */}
        {/* <SheetNum /> */}
        {/* <CellNum /> */}
        <SelectSheet />
        <TextInput
          placeholder="セル番号を入力してください"
          label="セル番号"
          value={cellNumber}
          onChange={chooseCell}
        />
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      {data ? <div>{`シート1のセル${cellNumber}の値：\n${data}`}</div> : <></>}
    </div>
  );
};
