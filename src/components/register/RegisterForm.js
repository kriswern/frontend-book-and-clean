import { useState, useEffect } from "react";
import RegisterService from "../../services/RegisterService";
import "../../css/registerForm.css";
import TokenService from "../../services/TokenService";
import { Link, useHistory } from "react-router-dom";

export default function RegisterForm() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    address: "",
    type: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [role, setRole] = useState();
  const history = useHistory();

  useEffect(() => {
    const role = TokenService.getRoleFromToken();
    if (role !== undefined) {
      setRole(role);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (RegisterService.registerUser(formData)) {
    }
    setFormData(initialState);
  };

  return (
    <div>
      {role !== "admin" && (
        <button className="back_button" onClick={() => history.push("/login")}>
          {" "}
          Back{" "}
        </button>
      )}
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          className="register-form d-flex flex-column align-content-center"
        >
          <div class="form-group-row">
            <label for="validationTooltip01" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="col-sm-10">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                type="text"
                class="form-control"
                id="validationTooltip01"
                placeholder=""
                required
              />
            </div>
          </div>
          <div class="form-group-row">
            <label for="inputEmail4" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder=""
                required
              />
            </div>
          </div>
          <div class="form-group-row">
            <label for="inputPassword4" class="col-sm-2 col-form-label ">
              Password
            </label>
            <div class="col-sm-10">
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder=""
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress" class="col-sm-2 col-form-label">
              Address
            </label>
            <div class="col-sm-10">
              <input
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder=""
                required
              />
            </div>
          </div>
          <br />
          <div class="form-check">
            <input
              class="form-check-input"
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
            <label class="form-check-label" for="exampleRadios1">
              Customer
            </label>
          </div>{" "}
          {role === "admin" && (
            <div class="form-check">
              <input
                class="form-check-input"
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
              <label class="form-check-label" for="exampleRadios2">
                Cleaner
              </label>
            </div>
          )}
          <br />
          <button type="submit" class="btn btn-primary">
            Register
          </button>
          <br />
          <p class="text-center">
            <Link to={"/gdpr"}>Privacy Policy(GDPR)</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
