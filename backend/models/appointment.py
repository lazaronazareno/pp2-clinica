from sqlalchemy import Column, BigInteger, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db.database import base

class Appointment(base):
    __tablename__ = 'appointment'
    
    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    date = Column(Date, nullable=False)
    active = Column(Boolean, default=False)
    user_id = Column(BigInteger, ForeignKey('user.id'), nullable=False)

    user = relationship("User", back_populates="appointments")
