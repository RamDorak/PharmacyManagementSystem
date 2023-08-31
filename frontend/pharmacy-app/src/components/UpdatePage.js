
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedications } from '../services/api';
import { useStateContext } from './StateContext';

// Particular medicine field updation
function UpdatePage() {
  const { state } = useStateContext();
  const [medications, setMedications] = useState([]);
  const [medicine_name, setMedicineName] = useState('');

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    const medicationsData = await getMedications(state.pharmacyName);
    console.log(medicationsData)
    setMedications(medicationsData.medications);
  };

  return (
    <div>
      <h2>Update Medication Page</h2>
      <ul>
        {medications.map((medication) => (
          <li key={medication.medication_id}>
            {medication.medicine_name}
            <Link to={`/update/${medication.medication_id}`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdatePage;
