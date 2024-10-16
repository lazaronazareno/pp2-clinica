from pydantic import BaseModel
from datetime import date
from typing import Optional

class UserBase(BaseModel):
    dni: int
    nombre: str
    apellido: str
    contraseña: str
    mail: str
    telefono: Optional[str]
    fecha_nacimiento: date
    is_admin: Optional[bool] = False
    is_empleado: Optional[bool] = False

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True