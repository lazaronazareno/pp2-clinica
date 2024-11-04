from sqlalchemy import Column, BigInteger, String
from sqlalchemy.orm import relationship
from db.database import base

class Department(base):
    __tablename__ = 'department'
    
    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    name = Column(String(80), nullable=False)
    
    users = relationship("User", back_populates="department")
    medical_records = relationship("MedicalRecord", back_populates="department")
