import React from 'react';

function ViewMedications({ medications }) {
  return (
    <div>
      <h2>Medication List</h2>
      <ul>
        {medications.map((medication) => (
          <li key={medication.medication_id}>{medication.medicine_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewMedications;
