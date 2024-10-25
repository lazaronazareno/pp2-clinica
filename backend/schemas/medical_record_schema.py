from pydantic import BaseModel
from datetime import date
from typing import Optional

class MedicalRecordCreate(BaseModel):
    user_id: int
    report: str
    department_id: int

class MedicalRecordResponse(MedicalRecordCreate):
    id: int
    created_at: date
    updated_at: Optional[date]

    class Config:
        from_attributes = True
