from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.department import Department
from schemas.department_schema import DepartmentCreate, DepartmentResponse
from db.database import get_db

department_root = APIRouter()

def get_department_by_id(db: Session, department_id: int):
    return db.query(Department).filter(Department.id == department_id).first()

def get_all_departments(db: Session):
    return db.query(Department).all()

def post_department(db: Session, department: DepartmentCreate):
    db_department = Department(**department.model_dump())
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

@department_root.post("/departments", response_model=DepartmentResponse, tags=["departments"])
def create_department(department: DepartmentCreate, db: Session = Depends(get_db)):
    return post_department(db=db, department=department)

@department_root.get("/departments/{department_id}", response_model=DepartmentResponse, tags=["departments"])
def read_department(department_id: int, db: Session = Depends(get_db)):
    db_department = get_department_by_id(db, department_id=department_id)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Especialidad no encontrada")
    return db_department

@department_root.get("/departments", response_model=list[DepartmentResponse], tags=["departments"])
def get_departments(db: Session = Depends(get_db)):
    return get_all_departments(db)

@department_root.put("/departments/{department_id}", response_model=DepartmentResponse, tags=["departments"])
def update_department(department_id: int, department: DepartmentCreate, db: Session = Depends(get_db)):
    db_department = get_department_by_id(db, department_id=department_id)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Especialidad no encontrada")
    db_department.name = department.name
    db.commit()
    db.refresh(db_department)
    return db_department

@department_root.delete("/departments/{department_id}", tags=["departments"])
def delete_department(department_id: int, db: Session = Depends(get_db)):
    db_department = get_department_by_id(db, department_id=department_id)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Especialidad no encontrada")
    db.delete(db_department)
    db.commit()
    return {"message": "Especialidad eliminada"}
