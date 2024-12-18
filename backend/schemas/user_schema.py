from pydantic import BaseModel, field_validator
from datetime import date
from typing import Optional
import re


class UserBase(BaseModel):
    dni: int
    name: str
    lastname: str
    password: str
    mail: str
    phone: Optional[str]
    date_birth: date
    is_admin: Optional[bool] = False
    is_doctor: Optional[bool] = False
    
    
    @field_validator("dni")
    def validate_dni(cls, value):
        if value < 0:
            raise ValueError("El DNI no puede ser negativo.")
        if len(str(value)) != 8:
            raise ValueError("El DNI debe tener exactamente 8 dígitos.")
        return value
    
    @field_validator("name")
    def validate_name(cls, value):
        if not re.match(r"^[A-Za-z\s]+$", value):
            raise ValueError("El nombre solo puede contener letras y espacios.")
        return value
    
    @field_validator("lastname")
    def validate_lastname(cls, value):
        if not re.match(r"^[A-Za-z\s]+$", value):
            raise ValueError("El apellido solo puede contener letras y espacios.")
        return value
    
    @field_validator("phone")
    def validate_phone(cls, value):
        if value is not None:
            if not value.isdigit():
                raise ValueError("El teléfono solo puede contener números.")
            if int(value) < 0:
                raise ValueError("El teléfono no puede ser un número negativo.")
        return value

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    dni: int
    name: str
    lastname: str
    password: Optional[str] = None
    mail: str
    phone: Optional[str]
    date_birth: date
    is_admin: Optional[bool] = False
    is_doctor: Optional[bool] = False
class UserResponse(BaseModel):
    id: int
    dni: int
    name: str
    lastname: str
    mail: str
    phone: Optional[str]
    date_birth: date
    is_admin: Optional[bool] = False
    is_doctor: Optional[bool] = False

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    mail: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    id: int
    user: str
    is_admin: bool
    is_doctor: bool
