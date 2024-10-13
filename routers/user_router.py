from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import userTest
from models.userTest import User
from schemas.user_schema import UserCreate, UserResponse
from db.database import engine, localsesion

userTest.base.metadata.create_all(bind=engine)

def get_db():
    db = localsesion()
    try:
        yield db
    finally:
        db.close()

user_root = APIRouter()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_all_users(db: Session):
    return db.query(User).all()

def post_user(db: Session, user: UserCreate):
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@user_root.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return post_user(db=db, user=user)

@user_root.get("/users/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_user

@user_root.get("/users")
def get_users(db: Session = Depends(get_db)):
    db_users = get_all_users(db)
    return db_users
