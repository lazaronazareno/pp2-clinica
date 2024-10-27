from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db.database import base

class Department(base):
    __tablename__ = 'department'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(200), nullable=True)

    medical_record = relationship("MedicalRecord", back_populates="departments")
