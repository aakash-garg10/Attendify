"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelection from "../_components/GradeSelection";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import PieChartComponent from "./_components/PieChartComponent";

//we have created a middleware so that no user can access the dashboard without login
const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const { setTheme } = useTheme(); //button is from shadcn
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    setTheme("light"); //jo b system ki theme hogi Dark ya light woh lag jayegi automatically
    getStudentAttendance();
  }, [selectedGrade]);

  useEffect(() => {
    getStudentAttendance();
  }, [selectedMonth]);

  //used to get student attendance for given month and grade
  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/yyyy")
    ).then((res) => {
      console.log(res.data);
      setAttendanceList(res.data);
    });
  };
  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex gap-2 items-center">
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
          <GradeSelection selectedGrade={(value) => setSelectedGrade(value)} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList}/>
      <div>
        <PieChartComponent attendanceList={attendanceList}/>
      </div>
    </div>
  );
};

export default Dashboard;
