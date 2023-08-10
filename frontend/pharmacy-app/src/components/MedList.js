import React from 'react';
import { deleteMedication } from '../services/api'; // Import the deleteMedication function
import {fetchMedications} from '../App';

function MedList({ medications, fetchMedications }) {
  const handleDelete = async (medicationId) => {
    const response = await deleteMedication(medicationId);
    if (response.message === 'Medication deleted successfully') {
      fetchMedications();
    }
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
