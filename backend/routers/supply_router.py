from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import supply
from models.supply import Supply
from schemas.supply_schema import SupplyCreate, SupplyResponse
from db.database import engine, localsesion

supply.base.metadata.create_all(bind=engine)

def get_db():
    db = localsesion()
    try:
        yield db
    finally:
        db.close()

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

@supply_router.post("/supplies", response_model=SupplyResponse)
def create_supply(supply: SupplyCreate, db: Session = Depends(get_db)):
    return post_supply(db=db, supply=supply)

@supply_router.get("/supplies/{supply_id}", response_model=SupplyResponse)
def read_supply(supply_id: int, db: Session = Depends(get_db)):
    db_supply = get_supply_by_id(db, supply_id=supply_id)
    if db_supply is None:
        raise HTTPException(status_code=404, detail="Insumo no encontrado")
    return db_supply

@supply_router.get("/supplies")
def get_supplies(db: Session = Depends(get_db)):
    db_supplies = get_all_supplies(db)
    return db_supplies

@supply_router.put("/supplies/{supply_id}", response_model=SupplyResponse)
def update_supply(supply_id: int, supply: SupplyCreate, db: Session = Depends(get_db)):
    db_supply = get_supply_by_id(db, supply_id=supply_id)
    if db_supply is None:
        raise HTTPException(status_code=404, detail="Insumo no encontrado")
    db_supply.name = supply.name
    db_supply.stock = supply.stock
    db.commit()
    db.refresh(db_supply)
    return db_supply

@supply_router.delete("/supplies/{supply_id}")
def delete_supply(supply_id: int, db: Session = Depends(get_db)):
    db_supply = get_supply_by_id(db, supply_id=supply_id)
    if db_supply is None:
        raise HTTPException(status_code=404, detail="Insumo no encontrado")
    db.delete(db_supply)
    db.commit()
    return {"message": "Insumo eliminado"}