import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href=""
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              {user ? 
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href=""
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </a>
              </li> : 
                 <li className="nav-item">
                 <a
                   className="nav-link"
                   aria-current="page"
                   href=""
                   onClick={() => {
                     navigate('/login')
                   }}
                 >
                   Login
                 </a>
               </li>
                }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
