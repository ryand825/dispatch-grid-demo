import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewSheet(props) {
  const { id } = props;

  const [sheetData, setSheetData] = useState({});
  const [sheetMap, setSheetMap] = useState([]);

  useEffect(() => {
    axios(`/api/test/get-sheet/${id}`).then(res => {
      // console.log(res.data);
      setSheetData(res.data);

      setSheetMap(
        res.data.rows.map((row, key) => {
          return (
            <div key={row.id}>
              <span>{row.cells[2].displayValue}</span>
              {" - "}
              <span>{row.cells[3].displayValue}</span>
              {" - "}
              <span>{row.cells[6].displayValue}</span>
            </div>
          );
        })
      );
    });
  }, [props]);

  if (sheetMap.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{sheetMap}</div>
    </div>
  );
}

export default ViewSheet;
