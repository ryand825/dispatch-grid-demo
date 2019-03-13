import React, { useEffect, useState } from "react";
import axios from "axios";

import DispatchGrid from "./DispatchGrid";

function ViewSheet(props) {
  const { id } = props;

  const [sheetData, setSheetData] = useState({ loading: true });
  const [sheetMap, setSheetMap] = useState([]);
  const [dateFilter, setDateFilter] = useState(new Date().getDay() - 7);

  const currentDate = new Date();
  const upperDateFilter = new Date();
  upperDateFilter.setDate(currentDate.getDate() - dateFilter);
  const lowerDateFilter = new Date();
  lowerDateFilter.setDate(currentDate.getDate() - dateFilter - 7);

  useEffect(() => {
    if (sheetData.loading) {
      axios(`/api/test/get-sheet/${id}`).then(res => {
        setSheetData(res.data);
      });
    } else {
      createSheetMap();
    }
  }, [sheetData, dateFilter]);

  const createSheetMap = () => {
    const { rows } = sheetData;

    const dateFilteredRows = rows.filter(row => {
      const dateString = row.cells[1].value;
      const rowDate = new Date(dateString);

      // console.log([upperDateFilter, rowDate, lowerDateFilter]);

      return rowDate <= upperDateFilter && rowDate >= lowerDateFilter;
    });

    setSheetMap(
      dateFilteredRows.map((row, key) => {
        const dateString = row.cells[1].value;
        const date = new Date(dateString);

        const jobId = row.id;
        const brand = row.cells[2].displayValue;
        const location = row.cells[3].displayValue;
        const description = row.cells[6].displayValue;
        const assignee = row.cells[10].displayValue;

        return {
          jobId,
          brand,
          location,
          description,
          assignee,
          date
        };
      })
    );
  };

  const handleDragAndDrop = droppedObject => {
    const selectedJob = sheetData.rows.filter(row => {
      return row.id === droppedObject.jobId;
    });
    let newJobDate = new Date(selectedJob[0].cells[1].value);
    newJobDate.setDate(
      newJobDate.getDate() + (droppedObject.dayOffset - newJobDate.getDay() + 1)
    );
    const newDateString = `${newJobDate.getFullYear()}-${(
      "0" +
      (newJobDate.getMonth() + 1)
    ).slice(-2)}-${("0" + newJobDate.getDate()).slice(-2)}`;

    const indexOfJob = sheetData.rows.indexOf(selectedJob[0]);
    let tempSheetObj = { ...sheetData };
    tempSheetObj.rows[indexOfJob].cells[10].displayValue =
      droppedObject.assignee;
    tempSheetObj.rows[indexOfJob].cells[10].value = droppedObject.assignee;
    tempSheetObj.rows[indexOfJob].cells[1].value = newDateString;
    setSheetData(tempSheetObj);
  };

  if (sheetData.loading) {
    return <div>Loading...</div>;
  }

  // Finds the assignee options and returns the array of names
  const assignees = sheetData.columns.filter(column => {
    return column.title === "assignee" || column.title === "Assignee";
  })[0].options;

  currentDate.setDate(currentDate.getDate() - dateFilter);
  let correctedLowerDate = new Date(lowerDateFilter);
  correctedLowerDate.setDate(correctedLowerDate.getDate() + 1);
  const displayDateString = `${correctedLowerDate.toDateString()} - ${upperDateFilter.toDateString()}`;

  return (
    <div>
      <button onClick={() => setDateFilter(dateFilter + 7)}>
        {"<<"} Last Week
      </button>
      <button onClick={() => setDateFilter(dateFilter - 7)}>
        Next Week >>
      </button>
      {displayDateString}
      <DispatchGrid
        assignees={assignees}
        jobs={sheetMap}
        dragAndDrop={handleDragAndDrop}
      />
    </div>
  );
}

export default ViewSheet;
