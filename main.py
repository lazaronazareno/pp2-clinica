from fastapi import FastAPI
from routers.user_router import user_root

app = FastAPI()

app.include_router(user_root)


#Lazaro


#Ale


#Mica