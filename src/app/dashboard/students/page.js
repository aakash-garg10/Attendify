"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import AddNewStudent from "./_components/AddNewStudent";
import { useEffect, useState } from "react";
import StudentListTable from "./_components/StudentListTable";

const Student = () => {
  const [studentsList, setStudentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading

  useEffect(() => {
    GetAllStudents();
  }, []);

  //this function will fetch all the students from the database
  const GetAllStudents = () => {
    GlobalApi.GetAllStudents()
      .then((res) => {
        console.log("From the student page", res.data);
        setStudentsList(res.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setIsLoading(false); // Set loading to false in case of error
      });
  };

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudent />
      </h2>
     
      {isLoading ? (
        <p>Loading...</p> // Render a loading indicator while fetching data
      ) : (
        <StudentListTable studentsList={studentsList} refreshData={GetAllStudents} />
      )}
    </div>
  );
};

export default Student;
