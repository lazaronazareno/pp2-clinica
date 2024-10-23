from sqlalchemy import Column, Integer, String
from db.database import base

class Supply(base):
    __tablename__ = 'insumo'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = Column(String(45), nullable=False)
    stock = Column(Integer, nullable=False)