from sqlalchemy import Column, Integer, String
from db.database import base

class Supply(base):
    __tablename__ = 'supply'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(80), nullable=False)
    stock = Column(Integer, nullable=False)
