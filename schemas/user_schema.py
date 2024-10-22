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

class UserResponse(BaseModel):
    id: int
    dni: int
    nombre: str
    apellido: str
    mail: str
    telefono: Optional[str]
    fecha_nacimiento: date
    is_admin: Optional[bool] = False
    is_empleado: Optional[bool] = False

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    mail: str
    contraseña: str

class Token(BaseModel):
    access_token: str
    token_type: str
    id: int
    user: str
    is_admin: bool
    is_empleado: bool