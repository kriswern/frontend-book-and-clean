import { Link} from "react-router-dom";


export default function Footer() {
  return (
    <footer className=" text-center p-2">
      <h2>made as a part of a course at Ec-utbildning</h2>
      <p>By:Fredrik,Oskar,Saurabh,Kristoffer</p> 
      <p><Link to={"/gdpr"}>Privacy Policy(GDPR)</Link></p>
    </footer>
  );
}
