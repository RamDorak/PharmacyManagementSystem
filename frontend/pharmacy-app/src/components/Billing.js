import { React } from 'react';

function Billing(){
    useEffect(() => {
        let cost = 0;
        selectedMedicines.forEach(med => {
          cost += med.price * (quantities[med.medication_id] || 0);
        });
        setTotalCost(cost);
      }, [selectedMedicines, quantities]
    );

    const handleMarkAsSold = async () => {
        const soldData = selectedMedicines.map(med => ({
          medication_id: med.medication_id,
          quantity: quantities[med.medication_id] || 0
        }));
      
        try {
          await axios.post('http://localhost:5000/sell-medicines', soldData);
          setSelectedMedicines([]);
          setQuantities({});
          setTotalCost(0);
          // Fetch updated medication list after selling
          fetchMedications();
        } catch (error) {
          console.error('Error while marking as sold:', error);
        }
      };

    return(
        <div>
            <div><h2>Sell Medicines</h2></div>
        </div>
    );
}