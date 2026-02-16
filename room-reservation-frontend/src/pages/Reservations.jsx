import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

function Reservations() {
  const [rooms, setRooms] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [form, setForm] = useState({
    roomId: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const roomsRes = await axios.get("/room");
    setRooms(roomsRes.data);

    const bookingsRes = await axios.get("/reservation/my");
    setMyBookings(bookingsRes.data);
  };

  const handleRoomChange = (id) => {
    const room = rooms.find(r => r._id === id);
    setSelectedRoom(room);
    setForm({ ...form, roomId: id });
  };

  const calculateDuration = () => {
    if (!form.startTime || !form.endTime) return 0;
    const diff = new Date(form.endTime) - new Date(form.startTime);
    return Math.ceil(diff / (1000 * 60));
  };

  const durationMinutes = calculateDuration();
  const totalPreview =
    selectedRoom && durationMinutes > 0
      ? durationMinutes * selectedRoom.pricePerMinute
      : 0;

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/reservation", form);
      alert("Room booked successfully");
      setForm({ roomId: "", startTime: "", endTime: "" });
      setSelectedRoom(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <Layout>
      <div className="container-fluid">

        <h2 className="fw-bold mb-4">Room Reservations</h2>

        {/* BOOKING FORM */}
        <div className="card shadow-sm border-0 p-4 mb-5">
          <h5 className="fw-bold mb-3">Book a Room</h5>

          <form onSubmit={handleBook}>
            <div className="row g-3">

              {/* Room Select */}
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={form.roomId}
                  onChange={(e) => handleRoomChange(e.target.value)}
                  required
                >
                  <option value="">Select Room</option>
                  {rooms.map(room => (
                    <option key={room._id} value={room._id}>
                      {room.roomName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Time */}
              <div className="col-md-4">
                <input
                  type="datetime-local"
                  className="form-control"
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                  required
                />
              </div>

              {/* End Time */}
              <div className="col-md-4">
                <input
                  type="datetime-local"
                  className="form-control"
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* ROOM PREVIEW */}
            {selectedRoom && (
              <div className="mt-4 p-3 border rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    {selectedRoom.image?.data && (
                      <img
                        src={`data:${selectedRoom.image.contentType};base64,${selectedRoom.image.data}`}
                        className="img-fluid rounded"
                        alt="Room"
                      />
                    )}
                  </div>

                  <div className="col-md-9">
                    <h6 className="fw-bold">{selectedRoom.roomName}</h6>
                    <p className="mb-1">
                      Price per minute: ₹{selectedRoom.pricePerMinute}
                    </p>
                    <p className="mb-1">
                      Duration: {durationMinutes} minutes
                    </p>
                    <h5 className="text-success">
                      Total Price: ₹{totalPreview}
                    </h5>
                  </div>
                </div>
              </div>
            )}

            <button className="btn btn-primary mt-4">
              Book Now
            </button>
          </form>
        </div>

        {/* MY BOOKINGS */}
        <h4 className="fw-bold mb-3">My Reservations</h4>

        <div className="row g-4">
          {myBookings.map(booking => (
            <div className="col-md-4" key={booking._id}>
              <div className="card shadow-sm border-0 reservation-card">

                {booking.roomId?.image?.data && (
                  <img
                    src={`data:${booking.roomId.image.contentType};base64,${booking.roomId.image.data}`}
                    className="card-img-top"
                    alt="Room"
                  />
                )}

                <div className="card-body">
                  <h5 className="fw-bold">
                    {booking.roomId?.roomName}
                  </h5>

                  <p className="text-muted mb-2">
                    <strong>Start:</strong>{" "}
                    {new Date(booking.startTime).toLocaleString()} <br />
                    <strong>End:</strong>{" "}
                    {new Date(booking.endTime).toLocaleString()}
                  </p>

                  <p className="fw-bold text-success">
                    Total Price: ₹{booking.totalPrice}
                  </p>

                  <span
                    className={`badge ${
                      booking.status === "approved"
                        ? "bg-success"
                        : booking.status === "cancelled"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {booking.status}
                  </span>
                  {booking.status !== "cancelled" && (
                    <button
                      className="btn btn-outline-danger mt-3 w-100"
                      onClick={async () => {
                        await axios.put(`/reservation/cancel/${booking._id}`);
                        fetchData();
                      }}
                    >
                      Cancel Reservation
                    </button>
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

export default Reservations;
