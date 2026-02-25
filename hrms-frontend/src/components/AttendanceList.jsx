import { useState, useEffect } from "react";
import API from "../api";

function ViewAttendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    API.get("/employees/")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchAttendance = async (employeeId) => {
    try {
      const res = await API.get(`/attendance/${employeeId}`);
      setAttendance(res.data);
    } catch (error) {
      console.error(error);
      setAttendance([]);
    }
  };

  const handleChange = (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);

    if (empId) {
      fetchAttendance(empId);
    } else {
      setAttendance([]);
    }
  };

  return (
    <div className="card">
      <h3>View Attendance</h3>

      <select value={selectedEmployee} onChange={handleChange}>
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.employee_id} value={emp.employee_id}>
            {emp.full_name} ({emp.employee_id})
          </option>
        ))}
      </select>

      {attendance.length > 0 && (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedEmployee && attendance.length === 0 && (
        <p>No attendance records found.</p>
      )}
    </div>
  );
}

export default ViewAttendance;