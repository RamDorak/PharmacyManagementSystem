
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMedication, updateMedication } from '../services/api';

function MedUpdate() {
  const { medicationId } = useParams();
  const [medication, setMedication] = useState(null);
  const [selectedField, setSelectedField] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');

  useEffect(() => {
    async function fetchMedication() {
      const med = await getMedication(medicationId);
      setMedication(med);
    }
    fetchMedication();
  }, [medicationId]);

  const handleUpdateField = async () => {
    if (!selectedField || !updatedValue) {
      return;
    }

    const updatedData = { [selectedField]: updatedValue };

    const response = await updateMedication(medicationId, updatedData);
    if (response.message === 'Medication updated successfully') {
      setMedication((prevMedication) => ({
        ...prevMedication,
        [selectedField]: updatedValue,
      }));
      setSelectedField('');
      setUpdatedValue('');
    }
  };

  const fieldOptions = [
    'medicine_name', 'generic_name', 'dosage_form', 'concentration',
    'manufacturer', 'DIN', 'expiration_date', 'quantity', 'price',
    'prescription_status', 'storage_conditions'
  ];

  return (
    <div>
      <h2>Update Medication</h2>
      <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
        <option value="">Select Field to Update</option>
        {fieldOptions.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>

      {selectedField && (
        <div>
          <label>{selectedField}</label>
          {selectedField === 'expiration_date' ? (
            <input
              type="date"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          ) : selectedField === 'quantity' ? (
            <input
              type="number"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          ) : selectedField === 'price' ? (
            <input
              type="number"
              step="0.01"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          ) : (
            <input
              type="text"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          )}
          <button onClick={handleUpdateField}>Update</button>
        </div>
      )}
    </div>
  );
}

export default MedUpdate;
