import React, { useState, useEffect } from 'react';
import './App.css';
import MedList from './components/MedList';
import MedForm from './components/MedForm';
import { getMedications, addMedication, deleteMedication } from './services/api';

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

  return (
    <div className="App">
      <h1>Pharmacy Management System</h1>
      <MedList medications={medications} fetchMedications={fetchMedications} onDelete={handleDeleteMedication} />
      <MedForm addMedication={handleAddMedication} />
    </div>
  );
}

export default App;
