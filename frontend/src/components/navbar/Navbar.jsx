import { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";


const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();


  // const onRent = useCallback(()=>{
  //   if(!user) {
  //     navigate("/login")
  //   }
  //   //suprotno
  //   rentModal.onOpen();


  // }, [user, navigate])


  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <span className="logo">StayAway</span>
        </Link>

        {/* //if user is logged in */}
        {user ? (
          <>
            <div className="nav-button">
              
              <Link to={`/profile/${user._id}`}>
                <button className="logoutBtn">Hey! {user.username ? user.username : user.firstName + ' ' + user.lastName} 😊</button>
              </Link>
              <button className="logoutBtn" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>

    // <div className="navbar">
    //   <div className="navContainer">
    //     <Link to="/" style={{ color: "white", textDecoration: "none" }}>
    //       <span className="logo">StayAway</span>
    //       <button className="logoutBtn">Log out</button>
    //     </Link>
    //     {user ? (
    //       user.username
    //     ) : (
    //       <div className="navItems">
    //         <Link to="/register">
    //           <button className="navButton">Register</button>
    //         </Link>
    //           <button className="navButton" onClick={handleLogout}>Login</button>

    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Navbar;
