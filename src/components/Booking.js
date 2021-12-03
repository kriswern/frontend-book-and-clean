import BookingService from "../services/BookingService";
import { useState } from "react";
import "../css/booking.css";

export default function Booking() {
  const initialState = {
    name: "",
    address: "",
    date: "",
    time: "",
  };

  const [formData, setFormData] = useState(initialState);

  // We need the customer here
  // const customerId =

  const handleSubmit = (e) => {
    e.preventDefault();
    BookingService.registerBooking(formData);
    setFormData(initialState);
  };

  return (
    <div className="booking-container">
      <form
        className="booking-form d-flex flex-column align-content-center"
        onSubmit={handleSubmit}
      >
        <h4 className="booking-header">Book cleaning</h4>

        <div className="form-group p-2">
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group p-2">
          <input
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            type="text"
            className="form-control"
            id="address"
            placeholder="Address"
            required
          />
        </div>
        <div className="form-group p-2">
          <input
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            type="date"
            id="date"
            className="form-control timepicker"
            required
          />
        </div>
        <div className="form-group p-2">
          <input
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            type="time"
            id="time"
            className="form-control datepicker"
            required
          />
        </div>
        <div className="d-flex p-2 justify-content-center">
          <button type="submit" className="btn btn-primary align-center">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
