import React, { useState } from 'react';
import '../styles/MedForm.css';

// Add medicine details
function MedForm({ addMedication }) {
  const [medicineName, setMedicineName] = useState('');
  const [dosageForm, setDosageForm] = useState('');
  const [concentration, setConcentration] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [expiration_date, setExpirationDate] = useState('');
  const [DIN, setDin] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [prescription_status, setPrescriptionStatus] = useState('');
  const [storage_conditions, setStorageConditions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedication({ 
      medicine_name: medicineName,
      dosage_form: dosageForm,
      concentration: concentration,
      manufacturer: manufacturer,
      expiration_date: expiration_date,
      DIN: DIN,
      quantity: quantity,
      price: price,
      prescription_status: prescription_status,
      storage_conditions: storage_conditions
    });
    setMedicineName('');
    setDosageForm('');
    setConcentration('');
    setManufacturer('');
    setExpirationDate('');
    setDin('');
    setQuantity('');
    setPrice('');
    setPrescriptionStatus('');
    setStorageConditions('');
  };

  return (
    <div className='AddMedicationForm'>
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
          Batch No:
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
        <button type="submit">Add Medication</button>
      </form>
    </div>
  );
}

export default MedForm;
