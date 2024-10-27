from pydantic import BaseModel
from datetime import date

class AppointmentCreate(BaseModel):
    date: date
    active: bool = False
    medical_record_id: int

class AppointmentResponse(BaseModel):
    id: int
    date: date
    active: bool
    medical_record_id: int

    class Config:
        from_attributes = True

class AppointmentEdit(BaseModel):
    date: date
    active: bool

    class Config:
        from_attributes = True