import React, { useState, useEffect } from 'react';
import { deleteMedication, getMedications } from '../services/api'; // Import the deleteMedication and getMedications functions

function MedList() {
  const [medications, setMedications] = useState([]);
  
  useEffect(() => {
    fetchMedications();
  }, []);

  const handleDelete = async (medicationId) => {
    const response = await deleteMedication(medicationId);
    if (response.message === 'Medication deleted successfully') {
      fetchMedications();
    }
  };

  const fetchMedications = async () => {
    const meds = await getMedications();
    setMedications(meds.medications);
  };


  return (
    <div>
      <h2>Medication List</h2>
      <ul>
        {medications.map((medication) => (
          <li key={medication.medication_id}>
            {medication.medicine_name}
            <button onClick={() => handleDelete(medication.medication_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedList;
