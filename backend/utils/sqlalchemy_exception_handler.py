from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from pymysql.err import IntegrityError as PyMySQLError

async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    if isinstance(exc, IntegrityError):
        if isinstance(exc.orig, PyMySQLError) and exc.orig.args[0] == 1062:
            return JSONResponse(
                status_code=400,
                content={"detail": "El valor proporcionado para el campo ya existe en la base de datos."}
            )
        return JSONResponse(
            status_code=400,
            content={"detail": "Error de integridad en la base de datos."}
        )
    
    return JSONResponse(
        status_code=500,
        content={"detail": "Error del servidor: error en la base de datos."}
    )
