import React, { useState } from "react";
const XLSX = require("xlsx");

export const Popup: React.VFC = () => {
  const [workbook, setWorkbook] = useState() as any;
  const [sheetNumber, setSheetNumber] = useState() as any;
  const [cellNumber, setCellNumber] = useState() as any;
  const [data, setData] = useState() as any;

  const handleReadFile = async (fileObject: File | null) => {
    if (fileObject) {
      const buffer = await fileObject.arrayBuffer();
      await setWorkbook(XLSX.read(buffer));
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.files[0]);
    handleReadFile(e.currentTarget.files[0]);
  };

  const chooseSheet = (e: any) => {
    const Sheet = "Sheet" + e.target.value;
    console.log(Sheet);
    setSheetNumber(Sheet);
  };

  const chooseCell = (e: any) => {
    const cell = e.target.value;
    const selected_cell = cell[0].toUpperCase() + cell.slice(1);
    setCellNumber(selected_cell);
  };
  const cellNum = document.getElementById("cellNum");
  cellNum?.addEventListener("change", chooseCell);

  const handleSubmit = (e: any) => {
    const Sheet = workbook.Sheets[sheetNumber];
    const targetCell = Sheet[cellNumber].v;
    console.log(`シート1のセル${cellNumber}の値：\n${targetCell}`);
    setData(targetCell);
    e.preventDefault();
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        <label>
          sheet number:
          <input type="text" onChange={chooseSheet} />
        </label>
        <label>
          choose cell:
          <input type="text" onChange={chooseCell} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {cellNumber ? <div>{data}</div> : <></>}
    </div>
  );
};
