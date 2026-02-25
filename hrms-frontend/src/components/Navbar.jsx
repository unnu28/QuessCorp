import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>HRMS Portal</h2>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/attendance">Attendance</Link>
      </div>
    </nav>
  );
}

export default Navbar;