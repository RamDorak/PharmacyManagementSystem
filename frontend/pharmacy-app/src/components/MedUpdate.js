import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMedication, updateMedication } from '../services/api';

// Update Medication page - displays list of medicines, user can choose which one to update
function MedUpdate() {
  const { medicationId } = useParams();
  const navigate = useNavigate();
  const [medication, setMedication] = useState({});
  const [medicine_name, setMedicineName] = useState('');
  const [updatedMedicineName, setUpdatedMedicineName] = useState('');
  const [dosageForm, setDosageForm] = useState('');
  const [concentration, setConcentration] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [expiration_date, setExpirationDate] = useState('');
  const [DIN, setDin] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [prescription_status, setPrescriptionStatus] = useState('');
  const [storage_conditions, setStorageConditions] = useState('');

  useEffect(() => {
    fetchMedication();
  }, []);

  const fetchMedication = async () => {
    try{
    const medicationData = await getMedication(medicationId);
    setMedication(medicationData.medication);
    setMedicineName(medicationData.medication.medicine_name);
    // setUpdatedMedicineName(medicationData.medication.medicine_name);
    setDosageForm(medicationData.medication.dosage_form);
    setConcentration(medicationData.medication.concentration);
    setManufacturer(medicationData.medication.manufacturer);
    setExpirationDate(medicationData.medication.expiration_date);
    setDin(medicationData.medication.DIN);
    setQuantity(medicationData.medication.quantity);
    setPrice(medicationData.medication.price);
    setPrescriptionStatus(medicationData.medication.prescription_status);
    setStorageConditions(medicationData.medication.storage_conditions);

    }catch(error){
      console.error("Error fetching medication: ", error);
    }
  };

  const handleUpdateMedication = async () => {

    const updatedMedicationData = {
      medicine_name: updatedMedicineName,
      dosage_form: dosageForm,
      concentration: concentration,
      manufacturer: manufacturer,
      expiration_date: expiration_date,
      DIN: DIN,
      quantity: quantity,
      price: price,
      prescription_status: prescription_status,
      storage_conditions: storage_conditions,
    };

    const response = await updateMedication(medicationId, updatedMedicationData);

    if (response.message === 'Medication updated successfully') {
      navigate('/view'); // Redirect to the medication list page after updating
    }
  };

  return (
    <div>
      <h2>Update Medication</h2>
      <div>
        <label>
          Medicine Name:
          <input
            type="text"
            value={updatedMedicineName}
            onChange={(e) => setUpdatedMedicineName(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          Dosage Form:
          <input
            type="text"
            value={dosageForm}
            onChange={(e) => setDosageForm(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          Concentration:
          <input
            type="text"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          Manufacturer:
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          Expiration Date:
          <input
            type="date"
            value={expiration_date}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          DIN:
          <input
            type="text"
            value={DIN}
            onChange={(e) => setDin(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          Quantity:
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          Prescription Status:
          <input
            type="text"
            value={prescription_status}
            onChange={(e) => setPrescriptionStatus(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label>
          Storage Conditions:
          <input
            type="text"
            value={storage_conditions}
            onChange={(e) => setStorageConditions(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <button onClick={handleUpdateMedication}>Update Medication</button>
      </div>
    </div>
  );
}

export default MedUpdate;
