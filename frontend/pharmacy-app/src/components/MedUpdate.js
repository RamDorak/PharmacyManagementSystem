
// import React, { useState, useEffect } from 'react';
// import { updateMedication, getMedications } from '../services/api'; // Import the updateMedication and getMedications functions

// function MedUpdate() {
//   const [medications, setMedications] = useState([]);
//   const [selectedMedication, setSelectedMedication] = useState(null);
//   const [selectedField, setSelectedField] = useState('');
//   const [updatedValue, setUpdatedValue] = useState('');
  
//   const fetchMedications = async () => {
//     const meds = await getMedications();
//     setMedications(meds.medications);
//   };

//   const handleUpdateField = async () => {
//     if (selectedMedication && selectedField && updatedValue) {
//       const response = await updateMedication(selectedMedication.medication_id, { [selectedField]: updatedValue });
//       if (response.message === 'Medication updated successfully') {
//         // Clear the updated fields and refresh medication list
//         setSelectedField('');
//         setUpdatedValue('');
//         fetchMedications();
//       }
//     }
//   };

//   useEffect(() => {
//     // Fetch medications on component mount
//     fetchMedications();
//   }, []);

//   return (
//     <div>
//       <h2>Update Medication Fields</h2>
//       <div>
//         <select
//           value={selectedMedication ? selectedMedication.medication_id : ''}
//           onChange={(e) => setSelectedMedication(medications.find(med => med.medication_id === parseInt(e.target.value)))}
//         >
//           <option value="">Select a Medication</option>
//           {medications.map((medication) => (
//             <option key={medication.medication_id} value={medication.medication_id}>
//               {medication.medicine_name}
//             </option>
//           ))}
//         </select>
//         {selectedMedication && (
//           <div>
//             <h3>Update Fields</h3>
//             <select
//               value={selectedField}
//               onChange={(e) => setSelectedField(e.target.value)}
//             >
//               <option value="">Select a Field to Update</option>
//               {/* Add options for the fields you want to update */}
//               <option value="DIN">DIN</option>
//               <option value="expiration_date">Expiration Date</option>
//               {/* Add more field options here */}
//             </select>
//             {selectedField && (
//               <div>
//                 <label>{selectedField}</label>
//                 {selectedField === 'expiration_date' ? (
//                   <input
//                     type="date"
//                     value={updatedValue}
//                     onChange={(e) => setUpdatedValue(e.target.value)}
//                   />
//                 ) : (
//                   <input
//                     type={selectedField === 'quantity' || selectedField === 'price' ? 'number' : 'text'}
//                     value={updatedValue}
//                     onChange={(e) => setUpdatedValue(e.target.value)}
//                   />
//                 )}
//                 <button onClick={handleUpdateField}>Update</button>
//               </div>
//             )}

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MedUpdate;

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
