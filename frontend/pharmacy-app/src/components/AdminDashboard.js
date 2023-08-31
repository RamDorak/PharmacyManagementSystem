import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from './StateContext';

function AdminDashboard() {
  const { state, setState } = useStateContext();
  const navigate = useNavigate();
  var value = 'pharmacy1';
  const [selectedPharmacy, setSelectedPharmacy] = useState(value);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    console.log("Fetching medications for:", selectedPharmacy)
    fetchMedications();
  }, [selectedPharmacy]);

  const handleSelectPharmacy = (e) => {
    const selectedPharmacy = e.target.value;
    setSelectedPharmacy(selectedPharmacy);
    setState({ ...state, pharmacyName: e.target.value , role: 'Admin'})
    fetchMedications();
  }

  const fetchMedications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/medications/${selectedPharmacy}`);
      console.log(response.data);
      if (response.status === 200) {
        setMedications(response.data.medications);
      } else {
        console.error('Failed to fetch medication data');
      }
    } catch (error) {
      console.error('Error while fetching medication data:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <label>Select Pharmacy: </label>
        <select value={selectedPharmacy} onChange={handleSelectPharmacy}>
          <option value="pharmacy1">Pharmacy 1</option>
          <option value="pharmacy2">Pharmacy 2</option>
          <option value="pharmacy3">Pharmacy 3</option>
        </select>
      </div>
      <button onClick={() => navigate('/home')}>Show Medications</button>
    </div>
  );
}

export default AdminDashboard;
