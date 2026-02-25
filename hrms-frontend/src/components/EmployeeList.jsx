import API from "../api";

function EmployeeList({ employees, onEmployeeDeleted }) {

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      onEmployeeDeleted();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (!employees || employees.length === 0) {
    return <p className="empty">No employees found.</p>;
  }

  return (
    <div className="card">
      <h3>Employee List</h3>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;