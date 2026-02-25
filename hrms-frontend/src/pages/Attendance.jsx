import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

function Attendance() {
  return (
    <div>
      <h1>Attendance Management</h1>
      <AttendanceForm />
      <AttendanceList />
    </div>
  );
}

export default Attendance;