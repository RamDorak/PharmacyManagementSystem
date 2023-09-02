import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from './StateContext';

function Billing() {
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [medications, setMedications] = useState([]);
  const { state } = useStateContext();
  const [selectedPharmacy, setSelectedPharmacy] = useState(state.pharmacy);

  useEffect(() => {
    let cost = 0;
    selectedMedicines.forEach((med) => {
      cost += med.price * (quantities[med.medication_id] || 0);
    });
    setTotalCost(cost);
  }, [selectedMedicines, quantities]);

  const fetchMedications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/medications/${selectedPharmacy}`);
      console.log(response.data);
      if (response.status === 200) {
        console.log('Medication data Billing.js');
        setMedications(response.data.medications);
      } else {
        console.error('Failed to fetch medication data');
      }
    } catch (error) {
      console.error('Error while fetching medication data:', error);
    }
  };

  const handleSellMedicine = (medication) => {
    setSelectedMedicines([...selectedMedicines, medication]);
  };

  const handleQuantityChange = (medicationId, quantity) => {
    setQuantities({ ...quantities, [medicationId]: quantity });
  };

  const handleRemoveMedicine = (medicationId) => {
    const updatedSelectedMedicines = selectedMedicines.filter((med) => med.medication_id !== medicationId);
    setSelectedMedicines(updatedSelectedMedicines);
  };

  const handleMarkAsSold = async () => {
    const soldData = selectedMedicines.map((med) => ({
      pharmacyName: state.pharmacy,
      medication_id: med.medication_id,
      quantity: quantities[med.medication_id] || 0,
    }));

    try {
      await axios.post('http://localhost:5000/sell-medicines', soldData);
      console.log("its not");
      setSelectedMedicines([]);
      setQuantities({});
      setTotalCost(0);
      fetchMedications();
    } catch (error) {
      console.log('Error while marking as sold:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Sell Medicines</h2>
      </div>
      <div>
        <h3>Medicines List</h3>
        <ul>
          {medications.map((medication) => (
            <li key={medication.medication_id}>
              {medication.medicine_name} - Price: Rs. {medication.price}
              <button onClick={() => handleRemoveMedicine(medication.medication_id)}>Remove</button>
              <button onClick={() => handleSellMedicine(medication)}>Sell</button>
              <input
                type="number"
                placeholder="Quantity"
                value={quantities[medication.medication_id] || 0 }
                onChange={(e) => handleQuantityChange(medication.medication_id, e.target.value)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Selected Medicines</h3>
        <ul>
          {selectedMedicines.map((medication) => (
            <li key={medication.medication_id}>
              {medication.medicine_name} - Quantity: {quantities[medication.medication_id] || 0}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Total Cost: Rs. {totalCost}</h3>
        <button onClick={handleMarkAsSold}>Mark as Sold</button>
      </div>
    </div>
  );
}
export default Billing;
