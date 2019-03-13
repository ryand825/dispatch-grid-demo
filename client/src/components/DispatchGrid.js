import React, { useState } from "react";

import JobCard from "./JobCard";
import "./dispatchGrid.css";

function DispatchGrid(props) {
  const { assignees, jobs, dragAndDrop } = props;

  const [assigneeData, setAssigneeData] = useState(
    [...assignees, undefined].map(assignee => {
      return { assignee, visible: true };
    })
  );

  const [jobBeingDragged, setJobBeingDragged] = useState(undefined);
  const [draggingOver, setDraggingOver] = useState({});

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const header = [undefined, ...weekDays].map((day, key) => {
    return (
      <div className="dispatch-grid-header" key={key}>
        {day}
      </div>
    );
  });

  const rows = assigneeData.map((assignee, assigneeKey) => {
    const jobCells = weekDays.map((day, dayKey) => {
      const jobData = jobs
        .filter(job => {
          const jobDay = job.date.getDay();
          return (
            dayKey === jobDay &&
            assignee.assignee === job.assignee &&
            assignee.visible
          );
        })
        .map((filteredJob, filteredJobKey) => {
          const { brand, location } = filteredJob;
          return (
            <JobCard
              key={"filtered" + filteredJobKey}
              name={`${brand} of ${location}`}
              description={filteredJob.description}
              handleDragStart={() => setJobBeingDragged(filteredJob.jobId)}
            />
          );
        });

      let dragClass = "";
      if (
        draggingOver.assigneeKey === assigneeKey &&
        draggingOver.dayOffset === dayKey
      ) {
        dragClass = "over";
      }

      return (
        <div
          key={assignee.assignee + day + dayKey}
          onDragOver={e => {
            e.preventDefault();
            setDraggingOver({
              jobId: jobBeingDragged,
              assigneeKey,
              assignee: assignee.assignee,
              dayOffset: dayKey
            });
          }}
          onDrop={() => {
            setDraggingOver({});
            dragAndDrop(draggingOver);
          }}
          id={`cell-${assigneeKey}-${dayKey}`}
          className={`dispatch-grid-cell ${dragClass} ${assignee.visible ||
            "dispatch-grid-assignee-hidden"}`}
        >
          {jobData}
        </div>
      );
    });

    return (
      <React.Fragment key={assignee + assigneeKey}>
        <button
          className={`dispatch-grid-assignee ${assignee.visible ||
            "dispatch-grid-assignee-hidden"}`}
          onClick={() => {
            let tempAssigneeArray = [...assigneeData];
            tempAssigneeArray[assigneeKey].visible = !tempAssigneeArray[
              assigneeKey
            ].visible;
            setAssigneeData(tempAssigneeArray);
          }}
        >
          {assignee.assignee || "Unnassigned"}
        </button>
        {jobCells}
      </React.Fragment>
    );
  });

  return (
    <div className="dispatch-grid">
      {header}
      {rows}
    </div>
  );
}

export default DispatchGrid;
