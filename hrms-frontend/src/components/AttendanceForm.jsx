import { useState, useEffect } from "react";
import API from "../api";

function AttendanceForm() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    API.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);
  const minDate = oneWeekAgo.toISOString().split("T")[0];

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/attendance/", form);
    alert("Attendance marked successfully!");
  } catch (error) {
    alert(error.response?.data?.detail || "Error marking attendance");
  }
};

  return (
    <div className="card">
      <h3>Mark Attendance</h3>

      <form onSubmit={handleSubmit}>
        <select
          required
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.employee_id} value={emp.employee_id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>

        <input
          type="date"
          required
          min={minDate}
          max={maxDate}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <select
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button type="submit">Mark</button>
      </form>
    </div>
  );
}

export default AttendanceForm;