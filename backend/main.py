from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.user_router import user_root
from routers.appointment_router import appointment_router
from routers.supply_router import supply_router
from routers.department_router import department_root
from routers.medical_record_router import medical_record_router
from utils.exception_handler import validation_exception_handler
from fastapi.exceptions import RequestValidationError
from utils.sqlalchemy_exception_handler import sqlalchemy_exception_handler
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI()

app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://front-rosy-iota.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_root)
app.include_router(appointment_router)
app.include_router(supply_router)

app.include_router(department_root)
app.include_router(medical_record_router)

#Lazaro


#Ale


#Mica