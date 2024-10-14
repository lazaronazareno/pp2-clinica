from pydantic import BaseModel
from datetime import date

class AppointmentCreate(BaseModel):
    fecha: date
    active: bool = False
    estudio_id: int

class AppointmentResponse(BaseModel):
    id: int
    fecha: date
    active: bool
    estudio_id: int

    class Config:
        orm_mode = True
