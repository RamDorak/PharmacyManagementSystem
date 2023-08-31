
from urllib.parse import quote_plus
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask import send_file

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:' + quote_plus('Ping@5858') + '@localhost/ramdb'
db = SQLAlchemy(app)

CORS(app, origins='http://localhost:3000', methods=['GET', 'POST', 'PUT', 'DELETE'], allow_headers=['Content-Type'])

class users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    pharmacy_name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(50), nullable = False)

# Pharmacy tables depicting 3 different pharmacies
class pharmacy1(db.Model):
    medication_id = db.Column(db.Integer, primary_key=True)
    medicine_name = db.Column(db.String(255))
    dosage_form = db.Column(db.String(100))
    concentration = db.Column(db.String(100))
    manufacturer = db.Column(db.String(255))
    expiration_date = db.Column(db.String(100))
    DIN = db.Column(db.String(20))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric(10, 2))
    prescription_status = db.Column(db.String(100))
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
        
class pharmacy2(db.Model):
    medication_id = db.Column(db.Integer, primary_key=True)
    medicine_name = db.Column(db.String(255))
    dosage_form = db.Column(db.String(100))
    concentration = db.Column(db.String(100))
    manufacturer = db.Column(db.String(255))
    expiration_date = db.Column(db.String(100))
    DIN = db.Column(db.String(20))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric(10, 2))
    prescription_status = db.Column(db.String(100))
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

class pharmacy3(db.Model):
    medication_id = db.Column(db.Integer, primary_key=True)
    medicine_name = db.Column(db.String(255))
    dosage_form = db.Column(db.String(100))
    concentration = db.Column(db.String(100))
    manufacturer = db.Column(db.String(255))
    expiration_date = db.Column(db.String(100))
    DIN = db.Column(db.String(20))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric(10, 2))
    prescription_status = db.Column(db.String(100))
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
        
pharmacy_classes= {
    'pharmacy1': pharmacy1,
    'pharmacy2': pharmacy2,
    'pharmacy3': pharmacy3
}     

# pharmacy_class = pharmacy_classes['pharmacy1']

@app.route('/login', methods=['POST'])   
def login():
    data= request.json
    username= data['username']
    password= data['password']
    User = users.query.filter_by(username= username, password= password).first()
    global pharmacy_name
    global pharmacy_class
    if User:
        pharmacy_name = User.pharmacy_name
        pharmacy_class = pharmacy_classes['pharmacy1']
        if User.role == 'Admin':
            response = jsonify(message = 'Admin has logged in', role = "Admin")
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            print("User found, Pharmacy name", pharmacy_name)
            medication= pharmacy_class.query.all()
            serialized_medications = [med.serialize() for med in medication]
            response = jsonify(medications=serialized_medications, role = "Pharmacist", pharmacy= pharmacy_name)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    else:
        response = jsonify(message = "Invalid login")
        response.headers.add('Access-Control-Allow-Origin', '*')
        return jsonify(message='Login unsuccessful'), 401
    
@app.route('/')
def hello():
    return 'Hello this is backend! \n Route to ''/medications/{pharmacy_name}'' if you want to see the medications data'

@app.route('/medications/<string:pharmacy_name>', methods=['GET'])
def get_medications(pharmacy_name):
    pharmacy_class = pharmacy_classes['pharmacy1']
    if (pharmacy_name == 'pharmacy1'):
        pharmacy_class = pharmacy_classes.get('pharmacy1')
    elif (pharmacy_name == 'pharmacy2'):
        pharmacy_class = pharmacy_classes.get('pharmacy2')
    elif (pharmacy_name == 'pharmacy3'):
        pharmacy_class = pharmacy_classes.get('pharmacy3')
    medication = pharmacy_class.query.all()
    serialized_medications = [med.serialize() for med in medication]
    response = jsonify(medications=serialized_medications)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/medications', methods=['POST'])
def create_medication():
    data = request.json
    new_medication = pharmacy_class(**data)
    db.session.add(new_medication)
    db.session.commit()
    return jsonify(message='Medication created successfully')

@app.route('/medications/<string:pharmacy_name>/<int:medication_id>', methods=['GET'])
def get_medication(pharmacy_name, medication_id):
    pharmacy_class = pharmacy_classes[pharmacy_name]
    print(pharmacy_class)
    medication = pharmacy_class.query.get(medication_id)
    if medication:
        return jsonify(medication.serialize())
    else:
        return jsonify(error='Medication not found'), 404
    
@app.route('/medications/<int:medication_id>', methods=['PUT'])
def update_medication(medication_id):
    medication = pharmacy_class.query.get(medication_id)
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
    medication = pharmacy_class.query.get(medication_id)
    if medication:
        db.session.delete(medication)
        db.session.commit()
        return jsonify(message='Medication deleted successfully')
    else:
        return jsonify(error='Medication not found'), 404
    
if __name__ == '__main__':
    app.run(debug=True)