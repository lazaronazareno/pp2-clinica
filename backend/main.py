from fastapi import FastAPI
from db.data_access import connexion

app = FastAPI()

@app.get('/')
def index():
    return 'test test'

#Lazaro


#Ale


#Mica