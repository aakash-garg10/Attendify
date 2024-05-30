import moment from "moment";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

const StatusList = ({ attendanceList }) => {
  // console.log("this is attendance list ;"+attendanceList)
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentPercentage, setPresentPercentage] = useState(0);
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

  useEffect(() => {
    const uniqueStudents = getUniqueRecord();
    setTotalStudents(attendanceList.length);
    const today = moment().date(); // Get the current day of the month
    console.log("Total students =", totalStudents, "Today =", today);
    console.log("Unique students length =", uniqueStudents.length);
    // Avoid division by zero
    if (uniqueStudents.length > 0 && today > 0) {
      const percentage =
        (totalStudents / (uniqueStudents.length * today)) * 800; //formulat is incorrect
      setPresentPercentage(percentage);
      console.log("Percentage =", percentage);
    }
  }, [attendanceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card
        icon={<GraduationCap />}
        title="Total students"
        value={totalStudents}
      />
      <Card
        icon={<TrendingUp />}
        title="Total % present"
        value={presentPercentage.toFixed(2)}
      />
      <Card
        icon={<TrendingDown />}
        title="Total % Absent"
        value={100-presentPercentage.toFixed(2)}
      />
    </div>
  );
};

export default StatusList;
