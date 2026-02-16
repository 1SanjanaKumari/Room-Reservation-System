import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomName: "",
    capacity: "",
    location: ""
  });
  const [editingId, setEditingId] = useState(null);
  const role = localStorage.getItem("role");

  const fetchRooms = async () => {
    const res = await axios.get("/room");
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomName", form.roomName);
    formData.append("capacity", form.capacity);
    formData.append("location", form.location);
    formData.append("pricePerMinute", form.pricePerMinute);
    formData.append("image", form.image);

    await axios.post("/room", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    fetchRooms();
  };


  const handleEdit = (room) => {
    setForm({
      roomName: room.roomName,
      capacity: room.capacity,
      location: room.location
    });
    setEditingId(room._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/room/${id}`);
    fetchRooms();
  };

  return (
    <Layout>
      <div className="container-fluid">

        <h2 className="fw-bold mb-4">Rooms Management</h2>

        {/* ADMIN FORM */}
        {role === "admin" && (
          <div className="card shadow-sm border-0 mb-4 p-4">
            <h5 className="fw-bold mb-3">
              {editingId ? "Update Room" : "Add New Room"}
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Room Name"
                    value={form.roomName}
                    onChange={(e) =>
                      setForm({ ...form, roomName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Capacity"
                    value={form.capacity}
                    onChange={(e) =>
                      setForm({ ...form, capacity: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    required
                  />
                </div>
                  <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price per Minute"
                    onChange={(e) =>
                      setForm({ ...form, pricePerMinute: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files[0] })
                    }
                    accept="image/*"
                  />
                </div>
                
              </div>

              <button className="btn btn-primary mt-3">
                {editingId ? "Update Room" : "Add Room"}
              </button>
            </form>
          </div>
        )}

        {/* ROOM CARDS */}
        <div className="row g-4">
          {rooms.map((room) => (
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
                  <p className="text-muted mb-2">
                    Capacity: {room.capacity} <br />
                    Location: {room.location}
                  </p>

                  {role === "admin" && (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary w-50"
                        onClick={() => handleEdit(room)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger w-50"
                        onClick={() => handleDelete(room._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}

export default Rooms;
