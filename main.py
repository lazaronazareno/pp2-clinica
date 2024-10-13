from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.user_router import user_root

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5173",
    "http://localhost:3306",
    # Agrega aquí los orígenes permitidos
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_root)