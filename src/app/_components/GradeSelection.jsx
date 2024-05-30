"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";


const GradeSelection = ({selectedGrade}) => {
    const [gradesList, setGradesList] = useState([])
  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((res) => {
      // console.log(res.data.grades)
      setGradesList(res.data.grades);
    });
  };
  return (
    <div>
      <select className="p-2 my-2" onChange={(e)=>selectedGrade(e.target.value)}>
        {gradesList.map((item, idx) => (
          <option key={idx} value={item.grade}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelection;
