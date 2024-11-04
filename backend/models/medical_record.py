from sqlalchemy import Column, BigInteger, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from db.database import base

class MedicalRecord(base):
    __tablename__ = 'medical_record'
    
    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    created_at = Column(Date, nullable=False)
    updated_at = Column(Date)
    report = Column(String(80))
    department_id = Column(BigInteger, ForeignKey('department.id'), nullable=False)
    user_id = Column(BigInteger, ForeignKey('user.id'), nullable=False)

    user = relationship("User", back_populates="medical_record")
    department = relationship("Department", back_populates="medical_records")
