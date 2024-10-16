from pydantic import BaseModel
from datetime import date

class MedicalRecordCreate(BaseModel):
    usuario_id: int
    created_at: date
    updated_at: date = None
    informe: str
    especialidad_id: int

class MedicalRecordResponse(BaseModel):
    id: int
    usuario_id: int
    created_at: date
    updated_at: date = None
    informe: str
    especialidad_id: int

    class Config:
        from_attributes = True