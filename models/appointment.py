from sqlalchemy import Column, Integer, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db.database import base

class Appointment(base):
    __tablename__ = 'turno'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha = Column(Date, nullable=False)
    active = Column(Boolean, default=False)

    estudio_id = Column(Integer, ForeignKey('estudio.id'), nullable=False)
    medical_record = relationship("MedicalRecord", back_populates="appointments")
