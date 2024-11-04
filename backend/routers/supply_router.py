from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.supply import Supply
from schemas.supply_schema import SupplyCreate, SupplyResponse
from db.database import get_db

supply_router = APIRouter()

def get_supply_by_id(db: Session, supply_id: int):
    return db.query(Supply).filter(Supply.id == supply_id).first()

def get_all_supplies(db: Session):
    return db.query(Supply).all()

def post_supply(db: Session, supply: SupplyCreate):
    db_supply = Supply(**supply.model_dump())
    db.add(db_supply)
    db.commit()
    db.refresh(db_supply)
    return db_supply

@supply_router.post("/supplies", response_model=SupplyResponse, tags=["supplies"])
def create_supply(supply: SupplyCreate, db: Session = Depends(get_db)):
    return post_supply(db=db, supply=supply)

@supply_router.get("/supplies/{supply_id}", response_model=SupplyResponse, tags=["supplies"])
def read_supply(supply_id: int, db: Session = Depends(get_db)):
    db_supply = get_supply_by_id(db, supply_id=supply_id)
    if db_supply is None:
        raise HTTPException(status_code=404, detail="Insumo no encontrado")
    return db_supply

@supply_router.get("/supplies", response_model=list[SupplyResponse], tags=["supplies"])
def get_supplies(db: Session = Depends(get_db)):
    return get_all_supplies(db)

@supply_router.put("/supplies/{supply_id}", response_model=SupplyResponse, tags=["supplies"])
def update_supply(supply_id: int, supply: SupplyCreate, db: Session = Depends(get_db)):
    db_supply = get_supply_by_id(db, supply_id=supply_id)
    if db_supply is None:
        raise HTTPException(status_code=404, detail="Insumo no encontrado")
    db_supply.name = supply.name
    db_supply.stock = supply.stock
    db.commit()
    db.refresh(db_supply)
    return db_supply

@supply_router.delete("/supplies/{supply_id}", tags=["supplies"])
def delete_supply(supply_id: int, db: Session = Depends(get_db)):
    db_supply = get_supply_by_id(db, supply_id=supply_id)
    if db_supply is None:
        raise HTTPException(status_code=404, detail="Insumo no encontrado")
    db.delete(db_supply)
    db.commit()
    return {"message": "Insumo eliminado exitosamente"}