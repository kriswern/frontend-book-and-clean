import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" text-center">
      <h6>Made as a part of a course at Ec-utbildning</h6>
      <small>
        <p>By: Fredrik, Oskar, Saurabh, Kristoffer</p>

        <p>
          <Link to={"/gdpr"}>Privacy Policy(GDPR)</Link>
        </p>
      </small>
    </footer>
  );
}
