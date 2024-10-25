from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import medical_record
from models.medical_record import MedicalRecord
from schemas.medical_record_schema import MedicalRecordCreate, MedicalRecordResponse
from db.database import engine, localsesion

medical_record.base.metadata.create_all(bind=engine)

def get_db():
    db = localsesion()
    try:
        yield db
    finally:
        db.close()

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

@medical_record_router.post("/medical-records", response_model=MedicalRecordResponse)
def create_medical_record(medical_record: MedicalRecordCreate, db: Session = Depends(get_db)):
    return post_medical_record(db=db, medical_record=medical_record)

@medical_record_router.get("/medical-records/{medical_record_id}", response_model=MedicalRecordResponse)
def read_medical_record(medical_record_id: int, db: Session = Depends(get_db)):
    db_medical_record = get_medical_record_by_id(db, medical_record_id=medical_record_id)
    if db_medical_record is None:
        raise HTTPException(status_code=404, detail="Registro médico no encontrado")
    return db_medical_record

@medical_record_router.get("/medical-records")
def get_medical_records(db: Session = Depends(get_db)):
    db_medical_records = get_all_medical_records(db)
    return db_medical_records
