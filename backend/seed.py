from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.userTest import User
from models.department import Department
from models.medical_record import MedicalRecord
from models.appointment import Appointment
from models.supply import Supply
import os

MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_PORT = os.getenv('MYSQL_PORT')

engine = create_engine(f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}")
Session = sessionmaker(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

def seed_data():
    users = [
        User(id=1, dni=30123456, name='Juan', lastname='Perez', password='test123', is_admin=1, is_doctor=0, mail='admin@clinica.com', phone='1134567890', date_birth='1978-02-25'),
        User(id=2, dni=28345678, name='Ana', lastname='Gomez', password='test123', is_admin=0, is_doctor=1, mail='ana.gomez@clinica.com', phone='1123456789', date_birth='1985-04-17'),
        User(id=3, dni=26347891, name='Maria', lastname='Rodriguez', password='test123', is_admin=0, is_doctor=0, mail='maria.rodriguez@correo.com', phone='1145678901', date_birth='1992-09-10'),
        User(id=4, dni=27564321, name='Carlos', lastname='Lopez', password='test123', is_admin=0, is_doctor=1, mail='carlos.lopez@clinica.com', phone='1156789012', date_birth='1975-12-12'),
        User(id=5, dni=29678432, name='Lucia', lastname='Fernandez', password='test123', is_admin=0, is_doctor=0, mail='lucia.fernandez@correo.com', phone='1167890123', date_birth='1988-07-05'),
        User(id=6, dni=31234567, name='Pedro', lastname='Martinez', password='test123', is_admin=1, is_doctor=0, mail='pedro.martinez@clinica.com', phone='1178901234', date_birth='1980-03-15'),
        User(id=7, dni=32345678, name='Laura', lastname='Diaz', password='test123', is_admin=1, is_doctor=0, mail='laura.diaz@clinica.com', phone='1189012345', date_birth='1982-06-20'),
        User(id=8, dni=33456789, name='Jorge', lastname='Ramirez', password='test123', is_admin=1, is_doctor=0, mail='jorge.ramirez@clinica.com', phone='1190123456', date_birth='1979-11-30'),
        User(id=9, dni=34567890, name='Sofia', lastname='Mendez', password='test123', is_admin=1, is_doctor=0, mail='sofia.mendez@clinica.com', phone='1101234567', date_birth='1983-09-25'),
        User(id=10, dni=35678901, name='Diego', lastname='Sanchez', password='test123', is_admin=0, is_doctor=1, mail='diego.sanchez@clinica.com', phone='1112345678', date_birth='1987-01-10'),
        User(id=11, dni=36789012, name='Valeria', lastname='Castro', password='test123', is_admin=0, is_doctor=1, mail='valeria.castro@clinica.com', phone='1123456789', date_birth='1990-05-22'),
        User(id=12, dni=37890123, name='Martin', lastname='Gonzalez', password='test123', is_admin=0, is_doctor=1, mail='martin.gonzalez@clinica.com', phone='1134567890', date_birth='1984-08-14'),
        User(id=13, dni=38901234, name='Carolina', lastname='Ruiz', password='test123', is_admin=0, is_doctor=1, mail='carolina.ruiz@clinica.com', phone='1145678901', date_birth='1986-12-05'),
        User(id=14, dni=39012345, name='Pablo', lastname='Hernandez', password='test123', is_admin=0, is_doctor=0, mail='pablo.hernandez@correo.com', phone='1156789012', date_birth='1991-03-18'),
        User(id=15, dni=40123456, name='Marta', lastname='Lopez', password='test123', is_admin=0, is_doctor=0, mail='marta.lopez@correo.com', phone='1167890123', date_birth='1989-07-29'),
        User(id=16, dni=41234567, name='Luis', lastname='Garcia', password='test123', is_admin=0, is_doctor=0, mail='luis.garcia@correo.com', phone='1178901234', date_birth='1993-10-11'),
        User(id=17, dni=42345678, name='Elena', lastname='Torres', password='test123', is_admin=0, is_doctor=0, mail='elena.torres@correo.com', phone='1189012345', date_birth='1992-02-07'),
        User(id=18, dni=43456789, name='Ricardo', lastname='Vega', password='test123', is_admin=1, is_doctor=1, mail='ricardo.vega@clinica.com', phone='1190123456', date_birth='1981-04-23'),
        User(id=19, dni=44567890, name='Natalia', lastname='Morales', password='test123', is_admin=1, is_doctor=1, mail='natalia.morales@clinica.com', phone='1101234567', date_birth='1985-09-12'),
        User(id=20, dni=45678901, name='Fernando', lastname='Ortiz', password='test123', is_admin=1, is_doctor=1, mail='fernando.ortiz@clinica.com', phone='1112345678', date_birth='1983-11-19'),
        User(id=21, dni=46789012, name='Gabriela', lastname='Silva', password='test123', is_admin=1, is_doctor=1, mail='gabriela.silva@clinica.com', phone='1123456789', date_birth='1987-06-30'),
    ]

    supplies = [
        Supply(id=1, name='Jeringas', stock=120),
        Supply(id=2, name='Gasas esteriles', stock=250),
        Supply(id=3, name='Guantes de latex', stock=300),
        Supply(id=4, name='Termometros digitales', stock=60),
        Supply(id=5, name='Algodon', stock=200),
        Supply(id=6, name='Alcohol en gel', stock=150),
        Supply(id=7, name='Barbijos', stock=100),
        Supply(id=8, name='Vendas', stock=180),
        Supply(id=9, name='Tijeras', stock=50),
        Supply(id=10, name='Desinfectante', stock=80),
    ]

    departments = [
        Department(id=1, name='Cardiologia'),
        Department(id=2, name='Neurologia'),
        Department(id=3, name='Ortopedia'),
        Department(id=4, name='Pediatria'),
        Department(id=5, name='Dermatologia'),
        Department(id=6, name='Ginecologia'),
        Department(id=7, name='Oftalmologia'),
        Department(id=8, name='Psiquiatria'),
        Department(id=9, name='Urologia'),
        Department(id=10, name='Oncologia'),
    ]

    medical_records = [
        MedicalRecord(id=1, created_at='2023-01-10', report='Informe de control de presion arterial', department_id=1, user_id=1),
        MedicalRecord(id=2, created_at='2023-02-20', report='Chequeo postoperatorio de cirugia cardiaca', department_id=1, user_id=2),
        MedicalRecord(id=3, created_at='2023-03-15', report='Evaluacion de funcion cognitiva', department_id=2, user_id=3),
        MedicalRecord(id=4, created_at='2023-04-25', report='Consulta por fractura de clavicula', department_id=3, user_id=4),
        MedicalRecord(id=5, created_at='2023-05-10', report='Consulta por dermatitis', department_id=5, user_id=5),
    ]

    appointments = [
        Appointment(id=1, date='2023-01-15', medical_record_id=1),
        Appointment(id=2, date='2023-02-05', medical_record_id=2),
        Appointment(id=3, date='2023-03-10', medical_record_id=3),
        Appointment(id=4, date='2023-04-20', medical_record_id=4),
        Appointment(id=5, date='2023-05-30', medical_record_id=5),
    ]

    session.add_all(users)
    session.commit()
    
    session.add_all(supplies)
    session.commit()

    session.add_all(departments)
    session.commit()

    session.add_all(medical_records)
    session.commit()

    session.add_all(appointments)
    session.commit()

    print("Datos de prueba insertados.")

if __name__ == "__main__":
    seed_data()
    session.close()
