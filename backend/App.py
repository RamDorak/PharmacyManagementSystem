from urllib.parse import quote_plus
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:' + quote_plus('Ping@5858') + '@localhost/ramdb'
db = SQLAlchemy(app)

CORS(app)

class Medication(db.Model):
    medication_id = db.Column(db.Integer, primary_key=True)
    medicine_name = db.Column(db.String(255))
    dosage_form = db.Column(db.String(100))
    concentration = db.Column(db.String(100))
    manufacturer = db.Column(db.String(255))
    expiration_date = db.Column(db.Date)
    DIN = db.Column(db.String(20))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric(10, 2))
    prescription_status = db.Column(db.Boolean)
    storage_conditions = db.Column(db.String(255))

    def serialize(self):
        return {
            'medication_id': self.medication_id,
            'medicine_name': self.medicine_name,
            'dosage_form': self.dosage_form,
            'concentration': self.concentration,
            'manufacturer': self.manufacturer,
            'expiration_date': str(self.expiration_date),
            'DIN': self.DIN,
            'quantity': self.quantity,
            'price': str(self.price),
            'prescription_status': self.prescription_status,
            'storage_conditions': self.storage_conditions
        }

@app.route('/')
def hello():
    return 'Hello, this is the backend!'

@app.route('/medications', methods=['GET'])
def get_medications():
    medications = Medication.query.all()
    serialized_medications = [medication.serialize() for medication in medications]
    response = jsonify(medications=serialized_medications)
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow requests from all origins
    return response

@app.route('/medications', methods=['POST'])
def create_medication():
    data = request.json
    new_medication = Medication(**data)
    db.session.add(new_medication)
    db.session.commit()
    return jsonify(message='Medication created successfully')

@app.route('/medications/<int:medication_id>', methods=['GET'])
def get_medication(medication_id):
    medication = Medication.query.get(medication_id)
    if medication:
        return jsonify(medication.serialize())
    else:
        return jsonify(error='Medication not found'), 404

@app.route('/medications/<int:medication_id>', methods=['PUT'])
def update_medication(medication_id):
    medication = Medication.query.get(medication_id)
    if medication:
        data = request.json
        for key, value in data.items():
            setattr(medication, key, value)
        db.session.commit()
        return jsonify(message='Medication updated successfully')
    else:
        return jsonify(error='Medication not found'), 404

@app.route('/medications/<int:medication_id>', methods=['DELETE'])
def delete_medication(medication_id):
    medication = Medication.query.get(medication_id)
    if medication:
        db.session.delete(medication)
        db.session.commit()
        return jsonify(message='Medication deleted successfully')
    else:
        return jsonify(error='Medication not found'), 404

if __name__ == '__main__':
    app.run(debug=True)
