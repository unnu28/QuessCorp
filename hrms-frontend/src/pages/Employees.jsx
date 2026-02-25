import { useEffect, useState } from "react";
import API from "../api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Management</h1>

      <EmployeeForm onEmployeeAdded={fetchEmployees} />

      <EmployeeList
        employees={employees}
        onEmployeeDeleted={fetchEmployees}
      />
    </div>
  );
}

export default Employees;