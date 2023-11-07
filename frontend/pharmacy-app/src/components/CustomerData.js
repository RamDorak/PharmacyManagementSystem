import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from './StateContext';
import '../styles/CustomerData.css';

function CustomerData() {
  const { state } = useStateContext();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    console.log(state.pharmacy);
    // Fetch customer data from the Flask backend when the component mounts.
    axios.get(`http://127.0.0.1:5000/customer-data/${state.pharmacy}`)
      .then((response) => {
        setCustomers(response.data.customers);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  return (
    <div className='customer-data-container'>
      <h2>Customer Data</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Purchase Amount</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.customer_name}</td>
              <td>{customer.phno}</td>
              <td>{customer.total_cost}</td>
              <td>{customer.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerData;
