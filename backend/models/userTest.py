from sqlalchemy import Column, BigInteger, String, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from db.database import base
import enum

class RoleEnum(enum.Enum):
    ADMIN = "ADMIN"
    PATIENT = "PATIENT"
    DOCTOR = "DOCTOR"

class User(base):
    __tablename__ = 'user'
    
    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    dni = Column(BigInteger, unique=True, nullable=False)
    name = Column(String(45), nullable=False)
    lastname = Column(String(45), nullable=False)
    password = Column(String(120), nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    mail = Column(String(80), unique=True, nullable=False)
    phone = Column(String(45))
    date_birth = Column(Date, nullable=False)
    department_id = Column(BigInteger, ForeignKey('department.id'))

    medical_record = relationship("MedicalRecord", back_populates="user", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="user", cascade="all, delete-orphan")
    department = relationship("Department", back_populates="users")
