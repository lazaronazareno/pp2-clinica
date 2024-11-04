from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.appointment import Appointment
from schemas.appointment_schema import AppointmentCreate, AppointmentResponse, AppointmentEdit
from db.database import get_db

appointment_router = APIRouter()

@appointment_router.get("/appointments/{appointment_id}", response_model=AppointmentResponse, tags=["appointments"])
def read_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if appointment is None:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    return appointment

@appointment_router.post("/appointments", response_model=AppointmentResponse, tags=["appointments"])
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(**appointment.model_dump())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@appointment_router.get("/appointments", response_model=list[AppointmentResponse], tags=["appointments"])
def get_all_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()

@appointment_router.put("/appointments/{appointment_id}", response_model=AppointmentResponse, tags=["appointments"])
def update_appointment(appointment_id: int, appointment: AppointmentEdit, db: Session = Depends(get_db)):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    db_appointment.date = appointment.date
    db_appointment.active = appointment.active
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@appointment_router.delete("/appointments/{appointment_id}", tags=["appointments"])
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    db.delete(db_appointment)
    db.commit()
    return {"message": "Turno eliminado"}
