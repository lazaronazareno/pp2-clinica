from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.medical_record import MedicalRecord
from schemas.medical_record_schema import MedicalRecordCreate, MedicalRecordResponse, MedicalRecordUpdate
from datetime import datetime, timezone
from db.database import get_db

medical_record_router = APIRouter()

def get_medical_record_by_id(db: Session, medical_record_id: int):
    return db.query(MedicalRecord).filter(MedicalRecord.id == medical_record_id).first()

def get_all_medical_records(db: Session):
    return db.query(MedicalRecord).all()

def post_medical_record(db: Session, medical_record: MedicalRecordCreate):
    db_medical_record = MedicalRecord(**medical_record.model_dump())
    db.add(db_medical_record)
    db.commit()
    db.refresh(db_medical_record)
    return db_medical_record

@medical_record_router.post("/medical-records", response_model=MedicalRecordResponse, tags=["medical-records"])
def create_medical_record(medical_record: MedicalRecordCreate, db: Session = Depends(get_db)):
    return post_medical_record(db=db, medical_record=medical_record)

@medical_record_router.get("/medical-records/{medical_record_id}", response_model=MedicalRecordResponse, tags=["medical-records"])
def read_medical_record(medical_record_id: int, db: Session = Depends(get_db)):
    db_medical_record = get_medical_record_by_id(db, medical_record_id=medical_record_id)
    if db_medical_record is None:
        raise HTTPException(status_code=404, detail="Registro médico no encontrado")
    return db_medical_record

@medical_record_router.get("/medical-records", response_model=list[MedicalRecordResponse], tags=["medical-records"])
def get_medical_records(db: Session = Depends(get_db)):
    return get_all_medical_records(db)

@medical_record_router.put("/medical-records/{medical_record_id}", response_model=MedicalRecordResponse, tags=["medical-records"])
def update_medical_record(medical_record_id: int, medical_record: MedicalRecordUpdate, db: Session = Depends(get_db)):
    db_medical_record = get_medical_record_by_id(db, medical_record_id=medical_record_id)
    if db_medical_record is None:
        raise HTTPException(status_code=404, detail="Registro médico no encontrado")
    db_medical_record.report = medical_record.report
    db_medical_record.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_medical_record)
    return db_medical_record

@medical_record_router.delete("/medical-records/{medical_record_id}", tags=["medical-records"])
def delete_medical_record(medical_record_id: int, db: Session = Depends(get_db)):
    db_medical_record = get_medical_record_by_id(db, medical_record_id=medical_record_id)
    if db_medical_record is None:
        raise HTTPException(status_code=404, detail="Registro médico no encontrado")
    db.delete(db_medical_record)
    db.commit()
    return {"message": "Registro médico eliminado satisfactoriamente"}
