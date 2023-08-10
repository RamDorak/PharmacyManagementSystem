import React, { useState } from 'react';

function MedForm({ addMedication }) {
  const [medicineName, setMedicineName] = useState('');
  const [dosageForm, setDosageForm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedication({ medicine_name: medicineName });
    setMedicineName('');
  };

  return (
    <div>
      <h2>Add Medication</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Medicine Name:
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </label>
        <button type="submit">Add Medication</button>
      </form>
    </div>
  );
}

export default MedForm;
