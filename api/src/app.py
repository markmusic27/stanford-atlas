from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

from handlers import fetch_course_handler

# Response Models
class APIResponse(BaseModel):
    message: str
    version: str

class InstructorModel(BaseModel):
    name: Optional[str] = None
    first_name: Optional[str] = None
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    sunet_id: Optional[str] = None
    is_primary_instructor: Optional[bool] = None

class ScheduleModel(BaseModel):
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    location: Optional[str] = None
    days: List[str] = []
    instructors: List[InstructorModel] = []

class AttributeModel(BaseModel):
    name: Optional[str] = None
    value: Optional[str] = None
    description: Optional[str] = None
    catalog_print: Optional[bool] = None
    schedule_print: Optional[bool] = None

class TagModel(BaseModel):
    organization: Optional[str] = None
    name: Optional[str] = None

class LearningObjectiveModel(BaseModel):
    code: Optional[str] = None
    description: Optional[str] = None

class SectionModel(BaseModel):
    class_id: Optional[int] = None
    term: Optional[str] = None
    units: Optional[str] = None
    section_num: Optional[str] = None
    component: Optional[str] = None
    curr_class_size: Optional[int] = None
    max_class_size: Optional[int] = None
    curr_waitlist_size: Optional[int] = None
    max_waitlist_size: Optional[int] = None
    notes: Optional[str] = None
    schedules: List[ScheduleModel] = []
    attributes: List[AttributeModel] = []

class CourseModel(BaseModel):
    year: Optional[str] = None
    subject: Optional[str] = None
    code: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    gers: List[str] = []
    repeatable: Optional[bool] = None
    grading_basis: Optional[str] = None
    units_min: Optional[int] = None
    units_max: Optional[int] = None
    objectives: List[LearningObjectiveModel] = []
    final_exam: Optional[bool] = None
    sections: List[SectionModel] = []
    tags: List[TagModel] = []
    attributes: List[AttributeModel] = []
    course_id: Optional[int] = None
    active: Optional[bool] = None
    offer_num: Optional[str] = None
    academic_group: Optional[str] = None
    academic_org: Optional[str] = None
    academic_career: Optional[str] = None
    max_units_repeat: Optional[int] = None
    max_times_repeat: Optional[int] = None

class CourseResponse(BaseModel):
    id: str
    class_id: str
    message: str
    course: CourseModel
    section: SectionModel

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
    
    try:
        int_id = int(id)
        int_class_id = int(class_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Course ID and Class ID must be integers")
    
    try:
        course, section = fetch_course_handler(int_id, int_class_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    def map_instructor(i) -> InstructorModel:
        return InstructorModel(
            name=getattr(i, "name", None),
            first_name=getattr(i, "first_name", None),
            middle_name=getattr(i, "middle_name", None),
            last_name=getattr(i, "last_name", None),
            sunet_id=getattr(i, "sunet_id", None),
            is_primary_instructor=getattr(i, "is_primary_instructor", None),
        )

    def map_schedule(s) -> ScheduleModel:
        return ScheduleModel(
            start_date=getattr(s, "start_date", None),
            end_date=getattr(s, "end_date", None),
            start_time=getattr(s, "start_time", None),
            end_time=getattr(s, "end_time", None),
            location=getattr(s, "location", None),
            days=list(getattr(s, "days", []) or []),
            instructors=[map_instructor(i) for i in (getattr(s, "instructors", []) or [])],
        )

    def map_attribute(a) -> AttributeModel:
        return AttributeModel(
            name=getattr(a, "name", None),
            value=getattr(a, "value", None),
            description=getattr(a, "description", None),
            catalog_print=getattr(a, "catalog_print", None),
            schedule_print=getattr(a, "schedule_print", None),
        )

    def map_tag(t) -> TagModel:
        return TagModel(
            organization=getattr(t, "organization", None),
            name=getattr(t, "name", None),
        )

    def map_learning_objective(o) -> LearningObjectiveModel:
        return LearningObjectiveModel(
            code=getattr(o, "code", None),
            description=getattr(o, "description", None),
        )

    def map_section(sec) -> SectionModel:
        return SectionModel(
            class_id=getattr(sec, "class_id", None),
            term=getattr(sec, "term", None),
            units=getattr(sec, "units", None),
            section_num=getattr(sec, "section_num", None),
            component=getattr(sec, "component", None),
            max_class_size=getattr(sec, "max_class_size", None),
            curr_class_size=getattr(sec, "curr_class_size", None),
            curr_waitlist_size=getattr(sec, "curr_waitlist_size", None),
            max_waitlist_size=getattr(sec, "max_waitlist_size", None),
            notes=getattr(sec, "notes", None),
            schedules=[map_schedule(s) for s in (getattr(sec, "schedules", []) or [])],
            attributes=[map_attribute(a) for a in (getattr(sec, "attributes", []) or [])],
        )

    def map_course(c) -> CourseModel:
        return CourseModel(
            year=getattr(c, "year", None),
            subject=getattr(c, "subject", None),
            code=getattr(c, "code", None),
            title=getattr(c, "title", None),
            description=getattr(c, "description", None),
            gers=list(getattr(c, "gers", []) or []),
            repeatable=getattr(c, "repeatable", None),
            grading_basis=getattr(c, "grading_basis", None),
            units_min=getattr(c, "units_min", None),
            units_max=getattr(c, "units_max", None),
            objectives=[map_learning_objective(o) for o in (getattr(c, "objectives", []) or [])],
            final_exam=getattr(c, "final_exam", None),
            sections=[map_section(s) for s in (getattr(c, "sections", []) or [])],
            tags=[map_tag(t) for t in (getattr(c, "tags", []) or [])],
            attributes=[map_attribute(a) for a in (getattr(c, "attributes", []) or [])],
            course_id=getattr(c, "course_id", None),
            active=getattr(c, "active", None),
            offer_num=getattr(c, "offer_num", None),
            academic_group=getattr(c, "academic_group", None),
            academic_org=getattr(c, "academic_org", None),
            academic_career=getattr(c, "academic_career", None),
            max_units_repeat=getattr(c, "max_units_repeat", None),
            max_times_repeat=getattr(c, "max_times_repeat", None),
        )

    return CourseResponse(
        message=f"Course endpoint called with ID: {id} and Class ID: {class_id}",
        id=id,
        class_id=class_id,
        course=map_course(course),
        section=map_section(section),
    )

def main():
    """Main function to run the FastAPI application."""
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8080,
        reload=True
    )
