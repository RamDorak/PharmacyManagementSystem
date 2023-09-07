import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from './StateContext';
import PdfDocument from './PdfDocument';
import { pdf } from '@react-pdf/renderer';

function Billing() {
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [medications, setMedications] = useState([]);
  const [ custName, setCustName ] = useState("");
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

  const handleDownloadPDF = async () => {
    console.log("Selected Medicines "+selectedMedicines);
    const blob = await pdf(<PdfDocument selectedMedicines={selectedMedicines} quantities={quantities} totalCost={totalCost} custName={custName} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleMarkAsSold = async () => {
    const soldData = selectedMedicines.map((med) => ({
      pharmacyName: state.pharmacy,
      medication_id: med.medication_id,
      quantity: quantities[med.medication_id] || 0,
    }));

    try {
      await axios.post('http://localhost:5000/sell-medicines', soldData);
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
      <input
        type="Name"
        placeholder="Customer Name"
        value={custName}
        onChange={(e) => setCustName(e.target.value)}
      />
      <button>Set Bill</button>
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
        <button onClick={ handleMarkAsSold }>Mark as Sold</button>
        <br></br>
        <button onClick = { handleDownloadPDF }>Download Invoice</button>
      </div>
    </div>
  );
}
export default Billing;
