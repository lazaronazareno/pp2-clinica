from sqlalchemy import Column, Integer, String, Date, Boolean
from sqlalchemy.orm import relationship
from db.database import base
from models.medical_record import MedicalRecord

class User(base):
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    dni = Column(Integer, unique=True, nullable=False)
    name = Column(String(45), nullable=False)
    lastname = Column(String(45), nullable=False)
    password = Column(String(120), nullable=False)
    is_admin = Column(Boolean, default=False)
    is_doctor = Column(Boolean, default=False)
    mail = Column(String(80), unique=True, nullable=False)
    phone = Column(String(45))
    date_birth = Column(Date, nullable=False)

    medical_record = relationship(MedicalRecord, back_populates="user", cascade="all, delete-orphan")