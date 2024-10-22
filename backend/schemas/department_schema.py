from pydantic import BaseModel

class DepartmentCreate(BaseModel):
    nombre: str

class DepartmentResponse(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True
