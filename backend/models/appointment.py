from sqlalchemy import Column, Integer, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db.database import base

class Appointment(base):
    __tablename__ = 'appointment'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    date = Column(Date, nullable=False)
    active = Column(Boolean, default=False)

    medical_record_id = Column(Integer, ForeignKey('medical_record.id'), nullable=False)
    medical_record = relationship("MedicalRecord", back_populates="appointments")
