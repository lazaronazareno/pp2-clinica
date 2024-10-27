from sqlalchemy import Column, Integer, Date, DateTime, ForeignKey, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import base

class MedicalRecord(base):
    __tablename__ = 'medical_record'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(Date, default=func.now(), nullable=False)
    updated_at = Column(DateTime, nullable=True)
    report = Column(String(200), nullable=True)

    department_id = Column(Integer, ForeignKey('department.id'), nullable=False)
    departments = relationship("Department", back_populates="medical_record")

    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="medical_record")

    appointments = relationship("Appointment", back_populates="medical_record", cascade="all, delete-orphan")
