import { useEffect, useState, useMemo } from "react";
import API from "../api";

function Dashboard() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async (dept = "") => {
    try {
      setLoading(true);
      const url = dept ? `/dashboard/?department=${dept}` : "/dashboard/";
      const res = await API.get(url);

      setDepartments(res.data.departments || []);
      setTotalEmployees(res.data.total_employees || 0);
      setEmployees(res.data.employees || []);

      const attendanceRes = await API.get("/attendance/");
      setAttendanceRecords(attendanceRes.data || []);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleDepartmentChange = (e) => {
    const dept = e.target.value;
    setSelectedDept(dept);
    fetchDashboard(dept);
  };

  const employeesWithCounts = useMemo(() => {
    return employees.map((emp) => {
      const empAttendance = attendanceRecords.filter(
        (a) => a.employee_id === emp.employee_id
      );

      return { ...emp, present, absent };
    });
  }, [employees, attendanceRecords]);


  
  return (
    <div className="card">
      <h2>Dashboard</h2>
      <h3>Total Employees in Company: {totalEmployees}</h3>

      <select value={selectedDept} onChange={handleDepartmentChange}>
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>

      {loading && <p>Loading...</p>}

      {!loading && selectedDept && employeesWithCounts.length > 0 && (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
       
            </tr>
          </thead>
          <tbody>
            {employeesWithCounts.map((emp) => (
              <tr key={emp.employee_id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && selectedDept && employeesWithCounts.length === 0 && (
        <p>No employees found for this department.</p>
      )}

      <div style={{ marginTop: "15px" }}>
        <button onClick={() => fetchDashboard(selectedDept)}>Refresh Dashboard</button>
      </div>
    </div>
  );
}

export default Dashboard;