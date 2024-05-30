const { default: axios } = require("axios");

const GetAllGrades = () => axios.get("/api/grade");
const GetAllStudents = () => axios.get("/api/student");
const CreateNewStudent = (data) => axios.post("/api/student", data);
const DeleteStudentRecord = (id) => axios.delete(`/api/student?id=${id}`);

const GetAttendanceList=(grade,month)=>axios.get(`/api/attendance?grade=${grade}&date=${month}`)
const MarkAttendance=(data)=>axios.post(`/api/attendance`,data)
const MarkAbsent=(studentId,days,date)=>axios.delete(`/api/attendance?studentId=${studentId}&date=${date}&days=${days}`)

export default {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudents,
  DeleteStudentRecord,
  GetAttendanceList,
  MarkAttendance,
  MarkAbsent
};
