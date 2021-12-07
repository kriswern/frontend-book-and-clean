import "../../css/login.css";

export default function Login() {
  return (
    <div class="login-form-container">
      <div class="card w-25 align-self-center">
        <div class="card-header text-center">Login</div>
        <form class="card-body">
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group mt-2">
            <label for="inputPassword">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
