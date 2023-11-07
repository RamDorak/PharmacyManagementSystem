const API_BASE_URL = 'http://127.0.0.1:5000';

async function getMedications(pharmacyName) {
  const response = await fetch(`${API_BASE_URL}/medications/${pharmacyName}`);
  return response.json();
}

async function getMedication(pharmacyName, medicationId) {
  const response = await fetch(`${API_BASE_URL}/medications/${pharmacyName}/${medicationId}`);
  return response.json();
}

async function addMedication(medicationData) {
  const response = await fetch(`${API_BASE_URL}/medications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(medicationData),
  });
  return response.json();
}

async function deleteMedication(medicationId) {
  const response = await fetch(`${API_BASE_URL}/medications/${medicationId}`, {
    method: 'DELETE',
  });
  return response.json();
}

async function updateMedication(medicationId, updatedData) {
  const response = await fetch(`${API_BASE_URL}/medications/${medicationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  return response.json();
}

export { getMedications, addMedication, deleteMedication, updateMedication, getMedication };
