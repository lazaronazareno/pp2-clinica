from sqlalchemy import Column, BigInteger, String
from db.database import base

class Supply(base):
    __tablename__ = 'supply'
    
    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    name = Column(String(80), nullable=False)
    stock = Column(BigInteger, nullable=False)
