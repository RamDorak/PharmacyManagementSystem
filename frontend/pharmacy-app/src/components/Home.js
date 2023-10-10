import { useNavigate, Link } from "react-router-dom";
import { useStateContext } from "./StateContext";
import '../styles/Home.css';

function Home(){
    const navigate = useNavigate();
    const { state } = useStateContext();
    console.log(state.pharmacy);
    console.log(state.role);
    const handleLogout = () =>{
      navigate('/');
      window.location.reload();
    }
    const handleBack = () =>{
      navigate(-1);
    }
    const handleSelectPharmacy = () =>{
      navigate('/admin-dashboard');
    }
    return(
      <><div>Welcome to Pharmacy Management System, {state.role}</div>
      <div>
        <nav className="navbar">
          <div className="navbar-container">
            <ul className="navbar-menu">
              <li className="navbar-item a">  
                <button className="back-button" onClick= { handleBack }>Back</button>
              </li>
              <li className="navbar-item a">
                <Link to="/">Home</Link>
              </li>
              <li className="navbar-item a">
                <Link to="/view">View Medications</Link>
              </li>
              <li className="navbar-item a">
                <Link to="/add">Add Medication</Link>
              </li>
              <li className="navbar-item a">
                <Link to="/update">Update Medicine</Link>
              </li>
              <li className="navbar-item a">
                <Link to = "/billing">Billing</Link>
              </li>
              <li className="navbar-item a">
                {state.role === 'Admin' && <button className="pharmacy-select" onClick={handleSelectPharmacy}>Select Pharmacy</button>}
              </li>
              <li className="navbar-item a">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </nav>
      </div></>
    )
}

export default Home;