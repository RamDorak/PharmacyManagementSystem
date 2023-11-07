import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from './StateContext';
import Swal from 'sweetalert2';
import '../styles/Billing.css';

function Billing() {
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [medications, setMedications] = useState([]);
  const [ custName, setCustName ] = useState("");
  const [phno, setPhNo] = useState();
  const { state } = useStateContext();
  const [selectedPharmacy, setSelectedPharmacy] = useState(state.pharmacy);

  useEffect(() => {
    fetchMedications();
    let cost = 0;
    selectedMedicines.forEach((med) => {
      cost += med.price * (quantities[med.medication_id] || 0);
    });
    setTotalCost(cost);
  }, [selectedMedicines, quantities]);

  const fetchMedications = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/medications/${state.pharmacy}`);
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
  
  const handleSetName = async() => {
    Swal.fire(
      'Customer details set',
      '',
      'success'
    )
  }

  const handleMarkAsSold = async () => {
    
    try {
      const customerData = {
        customerName: custName,
        phno: phno,
        totalCost: totalCost,
        selectedMedicines: selectedMedicines.map((med) => med.medicine_name),
        pharmacy: state.pharmacy
      };
      // Post customerData to backend
      console.log("this is customer data", customerData);
      await axios.post('http://127.0.0.1:5000/add-customer', customerData);

      const soldData = selectedMedicines.map((med) => ({
        pharmacyName: state.pharmacy,
        medication_id: med.medication_id,
        quantity: quantities[med.medication_id] || 0,
      }));

      await axios.post('http://127.0.0.1:5000/sell-medicines', soldData);
      setSelectedMedicines([]);
      setQuantities({});
      setTotalCost(0);
    } catch (error) {
      console.log('Error while marking as sold:', error);
    }
    Swal.fire(
      'Marked as sold',
      '',
      'success'
    );
  };

  return (
    <div className='billing-container'>
      <div className='billing-header'>
        <h2>Sell Medicines</h2>
      </div>
      <div className='customer-info'>
        <input
          className='customer-info'
          type="Name"
          placeholder="Customer Name"
          value={custName}
          onChange={(e) => setCustName(e.target.value)}
        />
        <input
          className='customer-info'
          type="Ph_No"
          placeholder="Phone Number"
          value={phno}
          onChange={(e) => setPhNo(e.target.value)}
        />
        <button className='set-bill-button' onClick={handleSetName}>Set Customer Name</button>
      </div>
      <div className='medicines-list'>
        <h3>Medicines List</h3>
        <ul>
          {medications.map((medication) => (
            <li key={medication.medication_id} className='medicines-list'>
              {medication.medicine_name} - Price: Rs. {medication.price}
              <button className='remove-button' onClick={() => handleRemoveMedicine(medication.medication_id)}>Remove</button>
              <button className='sell-button' onClick={() => handleSellMedicine(medication)}>Sell</button>
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
      <div className='selected-medicines'>
        <h3>Selected Medicines</h3>
        <ul>
          {selectedMedicines.map((medication) => (
            <li key={medication.medication_id}>
              {medication.medicine_name} - Quantity: {quantities[medication.medication_id] || 0}
            </li>
          ))}
        </ul>
      </div>
      <div className='total-cost'>
        <h3>Total Cost: Rs. {totalCost}</h3>
        <button className='mark-sold-button' onClick={ handleMarkAsSold }>Mark as Sold</button>
      </div>
    </div>
  );
}

export default Billing;