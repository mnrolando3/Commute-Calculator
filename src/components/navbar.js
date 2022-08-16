import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="nav">
        <div className="nav-content">
          <div>
            <h1>Commutilator</h1>
          </div>
          <ul className="nav-items">
            <li className="nav-item">
              <Link to={"/"}>Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
