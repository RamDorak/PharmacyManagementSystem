import React, { useState } from 'react';

function MedForm({ addMedication }) {
  const [medicineName, setMedicineName] = useState('');
  const [dosageForm, setDosageForm] = useState('');
  const [concentration, setConcentration] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [expirationdate, setExpirationDate] = useState('');
  const [din, setDin] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [prescriptionstatus, setPrescriptionStatus] = useState('');
  const [storageconditions, setStorageConditions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedication({ 
      medicine_name: medicineName,
      dosage_form: dosageForm,
      concentration: concentration,
      manufacturer: manufacturer,
      expirationdate: expirationdate,
      din: din,
      quantity: quantity,
      price: price,
      prescriptionstatus: prescriptionstatus,
      storageconditions: storageconditions
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
            type="text"
            value={expirationdate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label> 
          DIN:
          <input
            type="text"
            value={din}
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
            value={prescriptionstatus}
            onChange={(e) => setPrescriptionStatus(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <label> 
          Storage Conditions:
          <input
            type="text"
            value={storageconditions}
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
