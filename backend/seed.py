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
session = Session()

def seed_data():
    department1 = Department(name="Pediatría")
    department2 = Department(name="Cardiología")
    department3 = Department(name="Dermatología")
    department4 = Department(name="Ginecología")
    department5 = Department(name="Psiquiatría")
    
    session.add_all([department1, department2, department3, department4, department5])
    session.commit() 

    users = [
        User(dni=12345678, name="Juan", lastname="Pérez", password="test123", role="DOCTOR", 
             mail="juan.perez@example.com", phone="01123456789", date_birth="1980-01-01", department_id=department1.id),
        User(dni=23456789, name="María", lastname="Gómez", password="test123", role="DOCTOR", 
             mail="maria.gomez@example.com", phone="01123456780", date_birth="1975-05-05", department_id=department2.id),
        User(dni=34567890, name="Carlos", lastname="López", password="test123", role="DOCTOR", 
             mail="carlos.lopez@example.com", phone="01123456781", date_birth="1985-03-15", department_id=department3.id),
        User(dni=45678901, name="Laura", lastname="Martínez", password="test123", role="DOCTOR", 
             mail="laura.martinez@example.com", phone="01123456782", date_birth="1990-07-20", department_id=department4.id),
        
        User(dni=56789012, name="Andrés", lastname="Fernández", password="test123", role="PATIENT", 
             mail="andres.fernandez@example.com", phone="01123456783", date_birth="1992-11-11", department_id=None),
        User(dni=67890123, name="Lucía", lastname="Rodríguez", password="test123", role="PATIENT", 
             mail="lucia.rodriguez@example.com", phone="01123456784", date_birth="1995-01-25", department_id=None),
        User(dni=78901234, name="Fernando", lastname="Sanchez", password="test123", role="PATIENT", 
             mail="fernando.sanchez@example.com", phone="01123456785", date_birth="1988-06-30", department_id=None),
        User(dni=89012345, name="Sofía", lastname="Jiménez", password="test123", role="PATIENT", 
             mail="sofia.jimenez@example.com", phone="01123456786", date_birth="1993-09-09", department_id=None),

        User(dni=90123456, name="Roberto", lastname="Díaz", password="test123", role="ADMIN", 
             mail="roberto.diaz@example.com", phone="01123456787", date_birth="1980-04-04", department_id=None),
        User(dni=12345679, name="Patricia", lastname="Cruz", password="test123", role="ADMIN", 
             mail="patricia.cruz@example.com", phone="01123456788", date_birth="1978-02-02", department_id=None),
        User(dni=23456780, name="Javier", lastname="Mendoza", password="test123", role="ADMIN", 
             mail="javier.mendoza@example.com", phone="01123456789", date_birth="1985-08-08", department_id=None),
        User(dni=34567891, name="Valeria", lastname="Salas", password="test123", role="ADMIN", 
             mail="valeria.salas@example.com", phone="01123456790", date_birth="1990-10-10", department_id=None),
    ]

    session.add_all(users)
    session.commit()

    medical_records = [
        MedicalRecord(created_at="2024-01-01", updated_at=None, report="Examen general",
                      department_id=department1.id, user_id=users[0].id),  
        MedicalRecord(created_at="2024-01-02", updated_at=None, report="Consulta de rutina",
                      department_id=department2.id, user_id=users[1].id),  
        MedicalRecord(created_at="2024-01-03", updated_at=None, report="Control de piel",
                      department_id=department3.id, user_id=users[2].id),  
        MedicalRecord(created_at="2024-01-04", updated_at=None, report="Consulta ginecológica",
                      department_id=department4.id, user_id=users[3].id),  
        MedicalRecord(created_at="2024-01-05", updated_at=None, report="Consulta psiquiátrica",
                      department_id=department5.id, user_id=users[4].id),  
    ]

    session.add_all(medical_records)
    session.commit() 

    appointments = [
        Appointment(date="2024-11-01", active=True, user_id=users[0].id),
        Appointment(date="2024-11-02", active=True, user_id=users[1].id),
        Appointment(date="2024-11-03", active=True, user_id=users[2].id),
        Appointment(date="2024-11-04", active=True, user_id=users[3].id),
        Appointment(date="2024-11-05", active=True, user_id=users[4].id),
    ]

    session.add_all(appointments)
    session.commit() 

    supplies = [
        Supply(name="Medicamento A", stock=100),
        Supply(name="Medicamento B", stock=200),
        Supply(name="Medicamento C", stock=150),
        Supply(name="Medicamento D", stock=80),
        Supply(name="Medicamento E", stock=120),
    ]

    session.add_all(supplies)
    session.commit() 

    print("Datos de prueba insertados.")

if __name__ == "__main__":
    seed_data()
    session.close()
