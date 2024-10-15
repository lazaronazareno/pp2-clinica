from sqlalchemy import Column, Integer, Date, DateTime, ForeignKey, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import base

class MedicalRecord(base):
    __tablename__ = 'estudio'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(Date, default=func.now(), nullable=False)
    updated_at = Column(DateTime, nullable=True)
    informe = Column(String(200), nullable=True)

    especialidad_id = Column(Integer, ForeignKey('especialidad.id'), nullable=False)
    departments = relationship("Department", back_populates="medical_record")

    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)
    user = relationship("User", back_populates="medical_record")

    appointments = relationship("Appointment", back_populates="medical_record")
