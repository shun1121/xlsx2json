import React, { useState } from "react";
const XLSX = require("xlsx");

export const Popup: React.VFC = () => {
  const [workbook, setWorkbook] = useState() as any
  const [sheetNumber, setSheetNumber] = useState() as any
  const [cellNumber, setCellNumber] = useState() as any

  const handleReadFile = async (fileObject: File | null) => {
    if (fileObject) {
      const buffer = await fileObject.arrayBuffer()
      await setWorkbook(XLSX.read(buffer))
    }
  }

  const handleChange = (e: any) => {
    e.preventDefault()
    console.log(e)
    console.log(e.currentTarget)
    console.log(e.currentTarget.files[0])
    handleReadFile(e.currentTarget.files[0])
  }

  const chooseSheet = (e: any) => {
    const Sheet = 'Sheet' + e.target.value
    console.log(Sheet)
    setSheetNumber(Sheet)
  }
  // const sheetNum = document.getElementById("sheetNum")
  // const sheetFunc:any = sheetNum?.addEventListener("change", chooseSheet)
  // console.log(sheetFunc)

  const chooseCell = (e: any) => {
    const cell = e.target.value
    const selected_cell = cell[0].toUpperCase() + cell.slice(1)
    const sheet_list = workbook.SheetNames
    console.log(sheet_list)
    setCellNumber(selected_cell)
    const Sheet1 = workbook.Sheets[sheet_list[0]]
    // console.log(Sheet1)
    // console.log(sheetFunc)
    const targetCell = Sheet1[selected_cell].v
    // const targetCell = sheetNumber[selected_cell].v
    console.log(`シート1のセル${selected_cell}の値：\n${targetCell}`)
  }
  const cellNum = document.getElementById("cellNum")
  cellNum?.addEventListener("change", chooseCell)

  return (
    <div style={{ padding: '20px' }}>
      <input type="file" onChange={handleChange} />
      <div>
        <span>sheet number: </span><input type="text" id="sheetNum" onChange={chooseSheet} />
      </div>
      <div>
        <span>choose cell: </span><input type="text" id="cellNum" />
      </div>
      {/* <div>
        <span>end: </span><input type="text"/>
      </div> */}
    </div>
  )
};
