import os
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.status import HTTP_401_UNAUTHORIZED
from dotenv import load_dotenv, find_dotenv

# Load environment variables from .env if present
load_dotenv(find_dotenv())

security_scheme = HTTPBearer(auto_error=True)

def require_api_key(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
):
    api_key = os.getenv("API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Server misconfigured: API_KEY not set")

    token = credentials.credentials if credentials else None
    if token != api_key:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid or missing bearer token")

    return True
