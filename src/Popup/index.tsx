import React from "react";
const XLSX = require("xlsx");

export const Popup: React.VFC = () => {
  const handleReadFile = async (fileObj: File | null) => {
    if (fileObj) {
      console.log(fileObj)
      fileObj.arrayBuffer().then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'buffer', bookVBA: true })
        console.log("↓")
        console.log(workbook)
        console.log("↑")
      })
    }
  }

  const handleChange = (e: any) => {
      e.preventDefault()
      console.log(e)
      console.log(e.currentTarget.files[0])
      console.log(e.target.value)
      handleReadFile(e.currentTarget.files[0])
  }
  return (
    <div style={{ padding: '20px' }}>
      <input type="file" onChange={handleChange} />
    </div>
  )
};
