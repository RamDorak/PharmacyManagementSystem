import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteMedication, getMedications } from '../services/api'; // Import the deleteMedication and getMedications functions
import { useStateContext } from './StateContext';

function MedList() {
  const [medications, setMedications] = useState([]);
  const { state } = useStateContext();
  
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
    const meds = await getMedications(state.pharmacy);
    setMedications(meds.medications);
  };

  return (
    <div>
      <h2>Medication List</h2>
      <ul>
        {medications.map((medication) => (
          <li key={medication.medication_id}>
            <table border="1" className='ViewTable'>
              <tr>
                <td>Medicine Name</td>
                <td>Batch No</td>
                <td>Exp. Date</td>
                <td>Conc.</td>
                <td>Manufacturer</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Prsc. Status</td>
                <td>Storage Cond.</td>
              </tr>
            <tr>
                <td>{medication.medicine_name}</td>
                <td>{medication.DIN}</td>
                <td>{medication.expiration_date}</td>
                <td>{medication.concentration}</td>
                <td>{medication.manufacturer}</td>
                <td>{medication.quantity}</td>
                <td>{medication.price}</td>
                <td>{medication.prescription_status}</td>
                <td>{medication.storage_conditions}</td>
                <td><button onClick={() => handleDelete(medication.medication_id)}>Delete</button></td>
            </tr>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedList;
