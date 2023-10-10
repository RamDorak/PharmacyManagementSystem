import './styles/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getMedications, addMedication, deleteMedication , updateMedication } from './services/api';
import { useStateContext } from './components/StateContext';
import MedList from './components/MedList';
import MedForm from './components/MedForm';
import MedUpdate from './components/MedUpdate';
import UpdatePage from './components/UpdatePage';
import Login from './components/Login';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import Billing from './components/Billing';

function App() {
  const [medications, setMedications] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const { state } = useStateContext();

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
  }

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    const medicationsData = await getMedications(state.pharmacy);
    setMedications(medicationsData.medications);
  };

  const handleAddMedication = async (medicationData) => {
    const response = await addMedication(medicationData);
    if (response.message === 'Medication created successfully') {
      fetchMedications();
    }
  };

  const handleDeleteMedication = async (medicationId) => {
    const response = await deleteMedication(medicationId);
    if (response.message === 'Medication deleted successfully') {
      fetchMedications();
    }
  };

  const handleUpdateMedication = async (medicationId, updatedData) => {
    const response = await updateMedication(medicationId, updatedData);
    if (response.message === 'Medication updated successfully') {
      fetchMedications();
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="app-container">
        <h1>Pharmacy Management System</h1>
        </div>
        { isLoggedIn ? < Home /> :
        <Login updateLoginStatus={updateLoginStatus}/> }
        <Routes>
          <Route path= "/login" component = {<Login />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/view" element={<MedList medications={medications} onDelete={handleDeleteMedication} />}/>
          <Route path="/add" element={<MedForm addMedication={handleAddMedication} />} />
          <Route path="/update" element={<UpdatePage onUpdate={handleUpdateMedication} />}/>
          <Route path="/update/:medicationId" element={<MedUpdate />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}/>
          <Route path="/billing" element={<Billing/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;