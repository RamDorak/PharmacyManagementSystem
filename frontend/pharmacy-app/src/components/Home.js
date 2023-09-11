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
          <ul className="">
            <div className="navbar-item">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/view">View Medications</Link>
            </li>
            <li>
              <Link to="/add">Add Medication</Link>
            </li>
            <li>
              <Link to="/update">Update Medicine</Link>
            </li>
            <li>
              <Link to = "/billing">Billing</Link>
            </li>
            </div>
          </ul>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <button className="back-button" onClick= { handleBack }>Back</button>
          {state.role === 'Admin' && <button className="pharmacy-select" onClick={handleSelectPharmacy}>Select Other Pharmacy</button>}
        </nav>
      </div></>
    )
}

export default Home;