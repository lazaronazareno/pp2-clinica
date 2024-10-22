from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.appointment import Appointment
from schemas.appointment_schema import AppointmentCreate, AppointmentResponse
from db.database import engine, localsesion

appointment_router = APIRouter()

def get_db():
    db = localsesion()
    try:
        yield db
    finally:
        db.close()

@appointment_router.get("/appointments/{appointment_id}", response_model=AppointmentResponse)
def read_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@appointment_router.post("/appointments", response_model=AppointmentResponse)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(**appointment.model_dump())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@appointment_router.get("/appointments", response_model=list[AppointmentResponse])
def get_all_appointments(db: Session = Depends(get_db)):
    appointments = db.query(Appointment).all()
    return appointments
