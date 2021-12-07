import BookingService from "../../services/BookingService";
import { useState } from "react";
import "../../css/booking.css";
import date from "date-and-time";

export default function NewBooking() {
  const initialState = {
    name: "",
    address: "",
    date: "",
    time: "",
  };

  const [formData, setFormData] = useState(initialState);
  const now = new Date();

  // We need the customer here
  // const customerId =

  const handleSubmit = (e) => {
    e.preventDefault();
    if (BookingService.registerBooking(formData)) {
    }
    setFormData(initialState);
  };

  return (
    <div className="newbooking-form-container">
      <form
        className="newbooking-form d-flex flex-column align-content-center"
        onSubmit={handleSubmit}
      >
        <h4 className="newbooking-header">Book cleaning</h4>

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
            min={date.format(now, "YYYY-MM-DD")}
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
            Confirm booking
          </button>
        </div>
      </form>
    </div>
  );
}
