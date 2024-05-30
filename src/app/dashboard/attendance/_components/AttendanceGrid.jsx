"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { toast } from "sonner";
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";

const AttendanceGrid = ({ attendanceList,selectedMonth }) => {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId",filter: true },
    { field: "name", filter: true },
  ]);
  const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    if (attendanceList) {
      // console.log(attendanceList)
      const userList = getUniqueRecord();
      setRowData(userList);
      console.log(userList);

      daysArray.forEach((date) => {
        setColDefs((prev) => [
          ...prev,
          { field: date.toString(), width: 50, editable: true },
        ]);

        userList.forEach((obj) => {
          obj[date] = isPresent(obj.studentId, date);
          //   obj[date] = true;
        });
      });
    }
  }, [attendanceList]);

  //to check whether the student is present or not
  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.studentId == studentId && item.day == day
    );
    return result ? true : false;
  };

  //USED TO GET DISTINCT RECORDS
  const getUniqueRecord = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList?.forEach((item) => {
      if (!existingUser.has(item.studentId)) {
        uniqueRecord.push(item);
        existingUser.add(item.studentId);
      }
    });
    return uniqueRecord;
  };

  //to mark the student's attendace
  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date=moment(selectedMonth).format("MM/YYYY");
    if(presentStatus){
        const data={
            days:day,
            studentId:studentId,
            present:presentStatus,
            date:date
        }
        GlobalApi.MarkAttendance(data).then((res)=>{
            // console.log(res)
            toast("Student Id:"+studentId+" Marked Present")
        })
    }
    else{
        GlobalApi.MarkAbsent(studentId,day,date).then((res)=>{
            // console.log(res)
            toast("Student Id:"+studentId+" Marked Absent")
        })
    }
}
  return (
    <div>
      {/* // wrapping container with theme & size */}
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)
          }
        />
      </div>
    </div>
  );
};

export default AttendanceGrid;
