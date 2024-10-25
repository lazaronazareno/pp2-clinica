from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import userTest
from models.userTest import User
from schemas.user_schema import UserCreate, UserResponse, UserLogin, Token
from db.database import engine, localsesion
import jwt
from datetime import datetime, timedelta, timezone
import os

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

def get_user_doctor(db: Session):
    return db.query(User).filter(User.is_doctor == True).all()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, user: UserCreate):
    db_user = db.query(User).filter(User.mail == user.mail).first()
    if db_user is None:
        return 'usuario no encontrado'
    if db_user.password != user.password:
        return 'contraseña incorrecta'
    return db_user

@user_root.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = post_user(db=db, user=user)
        return db_user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@user_root.get("/users/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_user

@user_root.get("/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    db_users = get_all_users(db)
    return db_users

@user_root.post("/login", response_model=Token)
def login_for_access_token(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user)
    if db_user == 'usuario no encontrado':
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if db_user == 'contraseña incorrecta':
        raise HTTPException(
            status_code=401,
            detail="Contraseña incorrecta",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.mail}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "Bearer", "id": db_user.id ,"user": db_user.name, "is_admin": db_user.is_admin, "is_doctor": db_user.is_doctor}

@user_root.get("/doctors", response_model=list[UserResponse])
def get_doctors(db: Session = Depends(get_db)):
    db_users = get_user_doctor(db)
    return db_users
