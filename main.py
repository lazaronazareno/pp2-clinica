from fastapi import FastAPI
from routers.user_router import user_root
from routers.appointment_router import appointment_router

app = FastAPI()

app.include_router(user_root)
app.include_router(appointment_router)


#Lazaro


#Ale


#Mica