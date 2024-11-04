from pydantic import BaseModel
from datetime import date

class AppointmentCreate(BaseModel):
    date: date
    active: bool = False
    user_id: int

class AppointmentResponse(BaseModel):
    id: int
    date: date
    active: bool
    user_id: int 

    class Config:
        from_attributes = True

class AppointmentEdit(BaseModel):
    date: date
    active: bool
