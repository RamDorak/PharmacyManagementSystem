// // components/MedUpdate.js

// import React, { useState } from 'react';

// function MedUpdate({ medicationId, onUpdate }) {
//   const [updatedMedicineName, setUpdatedMedicineName] = useState('');

//   const handleUpdate = () => {
//     onUpdate(medicationId, { medicine_name: updatedMedicineName });
//     setUpdatedMedicineName('');
//   };

//   return (
//     <div>
//       <h2>Update Medication</h2>
//       <label>
//         New Medicine Name:
//         <input
//           type="text"
//           value={updatedMedicineName}
//           onChange={(e) => setUpdatedMedicineName(e.target.value)}
//         />
//       </label>
//       <button onClick={handleUpdate}>Update Medication</button>
//     </div>
//   );
// }

// export default MedUpdate;

// components/UpdatePage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedications } from '../services/api';

function UpdatePage() {
  const [medications, setMedications] = useState([]);
  const [medicine_name, setMedicineName] = useState('');

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    const medicationsData = await getMedications();
    setMedications(medicationsData.medications);
  };

  return (
    <div>
      <h2>Update Medication Page</h2>
      <ul>
        {medications.map((medication) => (
          <li key={medication.medication_id}>
            {medication.medicine_name}
            <Link to={`/update/${medication.medication_id}`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdatePage;
