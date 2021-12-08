import BookingService from "../../services/BookingService";
import { useState, useEffect } from "react";
import "../../css/booking.css";
import date from "date-and-time";
import Adminservice from "../../services/Adminservice";
import Bookings from "./Bookings";

export default function NewBooking() {
  const initialState = {
    name: "",
    address: "",
    date: "",
    time: "",
    customerId: "", //Hard coded for now. Will be the id of the customer you send in or Admin selects
  };

  const [formData, setFormData] = useState(initialState);
  const [role, setRole] = useState("admin"); //Hard-coded for now
  const [customers, setCustomers] = useState();

  const now = new Date();

  useEffect(() => {
    if (role === "admin") {
      Adminservice.getAllCustomers().then((response) => {
        setCustomers(response.data);
        console.log(response.data);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (BookingService.registerBooking(formData, role)) {
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

        {role === "admin" && (
          <div className="select-container">
            <label>Select customer:</label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, customerId: e.target.value })
              }
              className="custom-select"
              required
            >
              <option defaultValue=""></option>
              {customers &&
                customers.map((customer, index) => (
                  <option key={index} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="d-flex p-2 justify-content-center">
          <button type="submit" className="btn btn-primary align-center">
            Add booking
          </button>
        </div>
      </form>
    </div>
  );
}
