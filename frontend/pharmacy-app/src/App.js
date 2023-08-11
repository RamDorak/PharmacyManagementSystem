import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MedList from './components/MedList';
import MedForm from './components/MedForm';
import UpdatePage from './components/UpdatePage';
import MedUpdate from './components/MedUpdate';
import { getMedications, addMedication, deleteMedication , updateMedication } from './services/api';

function App() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    const medicationsData = await getMedications();
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
        <h1>Pharmacy Management System</h1>
        <nav>
          <ul>
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
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route
            path="/view"
            element={<MedList medications={medications} onDelete={handleDeleteMedication} />}/>
          <Route path="/add" element={<MedForm addMedication={handleAddMedication} />} /> {/* Add Medication page */}
          <Route
            path="/update"
            element={<UpdatePage onUpdate={handleUpdateMedication} />}
          />
          <Route path="/update/:medicationId" element={<MedUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home(){
  return(
    <div>Welcome to Pharmacy Management System</div>
  )
}

export default App;
