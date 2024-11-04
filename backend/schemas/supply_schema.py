from pydantic import BaseModel

class SupplyBase(BaseModel):
    name: str
    stock: int

class SupplyCreate(SupplyBase):
    pass

class SupplyResponse(SupplyBase):
    id: int

    class Config:
        from_attributes = True
