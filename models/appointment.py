
from sqlalchemy import Column, Integer, Date, Boolean, ForeignKey, String
from sqlalchemy.orm import relationship
from db.database import base

class Appointment(base):
    __tablename__ = 'turno'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha = Column(Date, nullable=False)
    active = Column(Boolean, default=False)
    estudio_id = Column(Integer, ForeignKey('estudio.id'), nullable=False)
    
    medical_record = relationship("MedicalRecord", back_populates="appointments")


class MedicalRecord(base):
    __tablename__ = 'estudio'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_usuario = Column(Integer, nullable=False)
    created_at = Column(Date, nullable=False)
    updated_at = Column(Date, nullable=True)
    informe = Column(String(200), nullable=True)
    especialidad_id = Column(Integer, ForeignKey('especialidad.id'), nullable=False)
    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)

    appointments = relationship("Appointment", back_populates="medical_record")
