import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 12,
    marginBottom: 10,
  },
  itemList: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: 'auto',
    border: '1px solid #000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex:0,
    fontSize: 12,
    maxHeight: 5,
    borderWidth: 1,
    borderColor: '#000',
    padding: 50,
    width: '80%',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const PdfDocument = ({ selectedMedicines, quantities, totalCost, custName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Pharmacy Bill</Text>
      <Text style={styles.customerName}>Customer Name: {custName}</Text>
      <Text style={styles.itemList}>Item List</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Medicine Name</Text>
          <Text style={styles.tableCell}>Price per Unit</Text>
          <Text style={styles.tableCell}>Quantity</Text>
        </View>
        {selectedMedicines.map((medications) => (
          <View style={styles.tableRow} key={medications.medication_id}>
            <Text style={styles.tableCell}>{medications.medicine_name}</Text>
            <Text style={styles.tableCell}>{medications.price}</Text>
            <Text style={styles.tableCell}>{quantities[medications.medication_id]}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.totalLabel}>Total Payable:</Text>
      <Text style={styles.totalAmount}>Rs. {totalCost}</Text>
    </Page>
  </Document>
);

export default PdfDocument;