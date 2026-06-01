import { useEffect, useState } from "react";
import api from "../services/api"; // adjust path if your api service is elsewhere

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "ADMIN") return;

    api
      .get("/admin/users")
      .then((res) => {
        setUsers(res.data.data); // adjust to match your actual response shape
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  if (role !== "ADMIN") {
    return <p>Access Denied</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id || user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;