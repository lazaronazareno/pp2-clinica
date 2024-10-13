
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv
from models.user import User
import os

#appointment Mica
#medical_records Lazaro
#supply Ale

load_dotenv()

MYSQL_USER = 'root'
MYSQL_PASSWORD = '1234'
MYSQL_DB = 'clinica'
MYSQL_HOST = 'localhost'
MYSQL_PORT = 3306

engine = create_engine(f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}")

localsesion = sessionmaker(autoflush=False, autocommit=False, bind=engine)

base = declarative_base()

user = None #User(1234,'name','lastname', False, False, '31/01/1900', 'user')

def connexion():
    db = localsesion()
    try:
        yield db
        db.query(User()).filter(User().name == 'bla').first()
        if user:
            print('if')
        else:
            print('else')
    
    except:
        db.close()


connexion()