from pydantic import BaseModel
from datetime import date
from typing import Optional

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

class UserCreate(UserBase):
    pass

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

