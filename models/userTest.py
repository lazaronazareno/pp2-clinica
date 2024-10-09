from sqlalchemy import Column, Integer, String, Date, Boolean
from db.database import base

class User(base):
    __tablename__ = 'usuario'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    dni = Column(Integer, unique=True, nullable=False)
    nombre = Column(String(45), nullable=False)
    apellido = Column(String(45), nullable=False)
    is_admin = Column(Boolean, default=False)
    is_empleado = Column(Boolean, default=False)
    mail = Column(String(80), nullable=False)
    telefono = Column(String(45))
    fecha_nacimiento = Column(Date, nullable=False)
