import { useState } from "react";
import API from "../api";

function EmployeeForm({ onEmployeeAdded }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/employees", form);

    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });

    setMessage("Employee added successfully!");
    onEmployeeAdded();
    setTimeout(() => {
      setMessage("");
    }, 2000);

  } catch (err) {
    setMessage(err.response?.data?.detail || "Error occurred");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
};

  return (
    <div className="card">
      <h3>Add Employee</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee ID"
          value={form.employee_id}
          required
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        />

        <input
          placeholder="Full Name"
          value={form.full_name}
          required
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Department"
          value={form.department}
          required
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />

        <button type="submit">Add</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default EmployeeForm;