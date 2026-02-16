import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [rooms, setRooms] = useState([]);
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  useEffect(() => {
    if (role === "admin") {
      axios.get("/dashboard").then(res => setStats(res.data));
    }

    axios.get("/room").then(res => setRooms(res.data));
  }, []);

  return (
    <Layout>
      <div className="container-fluid">

        {/* HERO SECTION */}
        <div className="hero-section mb-5 text-white d-flex align-items-center">
          <div>
            <h2 className="fw-bold">Welcome back, {name} 👋</h2>
            <p className="mb-0">
              Manage rooms, track bookings and monitor reservations easily.
            </p>
          </div>
        </div>

        {/* ADMIN STATISTICS */}
        {role === "admin" && (
          <div className="row g-4 mb-5">
            <div className="col-md-3">
              <div className="card stat-card bg-primary text-white">
                <div className="card-body">
                  <h6>Total Users</h6>
                  <h3>{stats.totalUsers || 0}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card stat-card bg-success text-white">
                <div className="card-body">
                  <h6>Total Rooms</h6>
                  <h3>{stats.totalRooms || 0}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card stat-card bg-warning text-dark">
                <div className="card-body">
                  <h6>Total Reservations</h6>
                  <h3>{stats.totalReservations || 0}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card stat-card bg-danger text-white">
                <div className="card-body">
                  <h6>Today Bookings</h6>
                  <h3>{stats.todayBookings || 0}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FEATURED ROOMS */}
        <h4 className="fw-bold mb-3">Featured Rooms</h4>

        <div className="row g-4">
          {rooms.slice(0, 6).map(room => (
            <div className="col-md-4" key={room._id}>
              <div className="card shadow-sm border-0 h-100 room-card">

                {room.image?.data ? (
                  <img
                    src={`data:${room.image.contentType};base64,${room.image.data}`}
                    className="card-img-top"
                    alt="Room"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/400x200?text=No+Image"
                    className="card-img-top"
                    alt="No Image"
                  />
                )}


                <div className="card-body">
                  <h5 className="fw-bold">{room.roomName}</h5>
                  <p className="text-muted">
                    Capacity: {room.capacity} <br />
                    Location: {room.location}
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;
