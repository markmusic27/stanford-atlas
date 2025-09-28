from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
import uvicorn

# Response Models
class APIResponse(BaseModel):
    message: str
    version: str

class CourseResponse(BaseModel):
    message: str
    id: str
    class_id: str
    note: str
    # Add more fields here when you implement course retrieval
    # title: Optional[str] = None
    # description: Optional[str] = None
    # credits: Optional[int] = None

app = FastAPI(
    title="Course API",
    description="Simple wrapper around explorecourses library",
    version="0.1.0"
)

@app.get("/", response_model=APIResponse)
async def root():
    """Root endpoint returning basic API information."""
    return APIResponse(message="Course API", version="0.1.0")

@app.get("/course", response_model=CourseResponse)
async def get_course(
    id: str = Query(..., description="Course ID to retrieve"),
    class_id: str = Query(..., description="Class ID to retrieve")
):
    """
    Get course information by ID and class ID.
    
    Args:
        id: Course ID passed as query parameter (?id={ID})
        class_id: Class ID passed as query parameter (?class_id={CLASS_ID})
        
    Returns:
        Course information (to be implemented)
    """
    if not id:
        raise HTTPException(status_code=400, detail="Course ID is required")
    if not class_id:
        raise HTTPException(status_code=400, detail="Class ID is required")
    
    # TODO: Implement course retrieval logic here
    # This is where you'll add your course fetching implementation
    return CourseResponse(
        message=f"Course endpoint called with ID: {id} and Class ID: {class_id}",
        id=id,
        class_id=class_id,
        note="Course retrieval logic to be implemented"
    )

def main():
    """Main function to run the FastAPI application."""
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8080,
        reload=True
    )
