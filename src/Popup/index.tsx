import React, { useState } from "react";
import { TextInput, NumberInput } from "@mantine/core";
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
  const [targetSheet, setTargetSheet] = useState("");
  const [targetCell, setTargetCell] = useState("");
  const [sheetNumber, setSheetNumber] = useState("");
  const [data, setData] = useState("");

  const handleReadFile = async (fileObject: File | null) => {
    if (fileObject) {
      const buffer = await fileObject.arrayBuffer();
      await setWorkbook(XLSX.read(buffer));
    }
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileObject: File | null = e.currentTarget.files![0];
    handleReadFile(fileObject);
  };

  const chooseCell = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cell = e.target.value;
    const selected_cell = cell[0].toUpperCase() + cell.slice(1);
    setTargetCell(selected_cell);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(workbook);
    if (workbook.Sheets[targetSheet] !== undefined) {
      const Sheet = workbook.Sheets[targetSheet];
      if (Sheet[targetCell] !== undefined) {
        const target_cell = Sheet[targetCell].v;
        setData(target_cell);
      } else {
        console.log("cannot find the value in the cell");
      }
    } else {
      console.log("cannot find the sheet");
    }
  };

  const SelectSheet = () => {
    return (
      <NumberInput
        label="シート番号"
        value={Number(sheetNumber)}
        onChange={(val: number) => {
          setSheetNumber(val.toString());
          setTargetSheet("Sheet" + val.toString());
        }}
      />
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" onChange={selectFile} />
      <form onSubmit={handleSubmit}>
        <SelectSheet />
        <TextInput
          placeholder="セル番号を入力してください"
          label="セル番号"
          value={targetCell}
          onChange={chooseCell}
        />
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      {data ? <div>{`シート1のセル${targetCell}の値：\n${data}`}</div> : <></>}
    </div>
  );
};
