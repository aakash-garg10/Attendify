"use client";
import GradeSelection from "@/app/_components/GradeSelection";
import MonthSelection from "@/app/_components/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useState } from "react";
import AttendanceGrid from "./_components/AttendanceGrid";

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState([]);

  // use to fetch attendance list based on given month and grade
  const onSearchHandler = () => {
    // console.log(selectedMonth, selectedGrade);
    const month = moment(selectedMonth).format("MM/YYYY");
    // console.log(month);
    GlobalApi.GetAttendanceList(selectedGrade, month).then((res) => {
      setAttendanceList(res.data);
    });
  };
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl ">Attendance</h2>
      {/* SEARCH OPTION */}
      {/* using popover from the shadcn */}
      <div className="flex gap-2 border rounded-md items-center p-3 my-2">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Grade:</label>
          <GradeSelection selectedGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button onClick={() => onSearchHandler()}>Search</Button>
      </div>
      {/* STUDENT ATTENDACE GRID */}
      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth}/>
    </div>
  );
};

export default Attendance;
