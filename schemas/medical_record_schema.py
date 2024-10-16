from pydantic import BaseModel
from datetime import date
from typing import Optional

class MedicalRecordCreate(BaseModel):
    usuario_id: int
    informe: str
    especialidad_id: int

class MedicalRecordResponse(MedicalRecordCreate):
    id: int
    created_at: date
    updated_at: Optional[date]

    class Config:
        from_attributes = True
