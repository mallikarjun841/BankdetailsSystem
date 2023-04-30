import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = (props) => {
  const navigate = useNavigate();
  console.log("me");
  const logoutcontent = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav>
      <ul className="headingcontainer">
        <li>
          <Link to="/">Bank</Link>
        </li>

        <li className="contentcontainer">
          <p>
            <Link className="detail" to="/">
              Account
            </Link>
          </p>
        </li>
        <li>
          <button
            onClick={logoutcontent}
            className="logoutbutton"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
