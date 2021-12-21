import BookingService from "../../services/BookingService";
import { useState, useEffect } from "react";
import "../../css/booking.css";
import date from "date-and-time";
import Adminservice from "../../services/Adminservice";
import TokenService from "../../services/TokenService";
import CustomerService from "../../services/CustomerService";

export default function NewBooking({ logout }) {
  const initialState = {
    name: "",
    address: "",
    date: "",
    time: "",
    customerId: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [role, setRole] = useState("");
  const [customers, setCustomers] = useState();
  const [priceList, setPriceList] = useState();

  let now = new Date();
  now = date.addDays(now, 2);

  useEffect(() => {
    const role = TokenService.getRoleFromToken();
    if (role !== undefined) {
      setRole(role);
    }
  }, []);

  useEffect(() => {
    if (role === "admin") {
      Adminservice.getAllCustomers().then((response) => {
        setCustomers(response.data);
      }).catch(error => logout(true));
    } else if (role === "customer") {
      CustomerService.getMyID().then((response) => {
        setFormData({ ...formData, customerId: response.data });
      }).catch(error => logout(true));
    }
  }, [role]);

  useEffect(() => {
    BookingService.getPriceList().then((response) => {
      setPriceList(response.data);
    }).catch(error => logout(true));
  }, []);

  useEffect(() => {
    if (role === "customer" && formData.customerId === "") {
      CustomerService.getMyID().then((response) => {
        setFormData({ ...formData, customerId: response.data });
      }).catch(error => logout(true));
    }
  }, [formData, role, logout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text =
      "Please confirm the provided information:\n\n" +
      formData.name +
      "\n" +
      formData.address +
      "\n\n" +
      formData.date +
      "\n" +
      formData.time +
      "\n";
    if (window.confirm(text)) {
      if (BookingService.registerBooking(formData, role)) {
        alert("Booking made");
      }
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
            min="07:00"
            max="18:00"
            className="form-control datepicker"
            required
          />
        </div>

        <div className="form-group p-2">
          <select
            onChange={(e) =>
              setFormData({ ...formData, priceListId: e.target.value })
            }
            className="form-control datepicker"
            required
          >
            <option value="">--Please choose a service--</option>
            {priceList &&
              priceList.map((priceList, index) => (
                <option key={index} value={priceList.id}>
                  {priceList.type}: {priceList.price}:-
                </option>
              ))}
          </select>
        </div>

        {role === "admin" && (
          <div className="form-group p-2 select-container">
            <select
              onChange={(e) =>
                setFormData({ ...formData, customerId: e.target.value })
              }
              className="form-control "
              required
            >
              <option value="">Select customer</option>
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
