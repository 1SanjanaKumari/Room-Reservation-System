import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form onSubmit={submit} className="card">
        <h2>Register</h2>
        <input placeholder="Name" onChange={(e) => setForm({...form, name:e.target.value})} />
        <input placeholder="Email" onChange={(e) => setForm({...form, email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password:e.target.value})} />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
