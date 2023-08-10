const API_BASE_URL = 'http://localhost:5000'; // Update with your backend URL

async function getMedications() {
  const response = await fetch(`${API_BASE_URL}/medications`);
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

// Add more API functions for update and delete
async function deleteMedication(medicationId) {
  const response = await fetch(`${API_BASE_URL}/medications/${medicationId}`, {
    method: 'DELETE',
  });
  return response.json();
}

export { getMedications, addMedication , deleteMedication};
