import { useState } from "react";
import RegisterService from "../../services/RegisterService";
import "../../css/registerForm.css";
import { Link } from "react-router-dom";

export default function RegisterForm({ role }) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    address: "",
    type: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (RegisterService.registerUser(formData)) {
    }
    setFormData(initialState);
  };

  return (
    <div>
      {role !== "admin" && (
        <Link to="/login" className="back_button">
          <button className="back_button">
            {" "}
            Back{" "}
          </button></Link> 
      )}
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          className="register-form d-flex flex-column align-content-center"
        >
          <div className="form-group-row">
            <label htmlFor="validationTooltip01" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                type="text"
                className="form-control"
                id="validationTooltip01"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="form-group-row">
            <label htmlFor="inputEmail4" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="form-group-row">
            <label htmlFor="inputPassword4" className="col-sm-2 col-form-label ">
              Password
            </label>
            <div className="col-sm-10">
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10">
              <input
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder=""
                required
              />
            </div>
          </div>
          <br />
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="customer"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                })
              }
              required
            />
            <label className="form-check-label" for="exampleRadios1">
              Customer
            </label>
          </div>{" "}
          {role === "admin" && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="cleaner"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value,
                  })
                }
                required
              />
              <label className="form-check-label" for="exampleRadios2">
                Cleaner
              </label>
            </div>
          )}
          <br />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <br />
          <p className="text-center">
            <Link to={"/gdpr"}>Privacy Policy(GDPR)</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
