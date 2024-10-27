from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    detailed_errors = [
        {"field": ".".join(str(loc) for loc in error["loc"][1:]), "error": error["msg"]}
        for error in errors
    ]
    return JSONResponse(
        status_code=422,
        content={"error": detailed_errors},
    )
