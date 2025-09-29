from typing import Tuple
from explorecourses import *
ACADEMIC_YEAR = "2025-2026"
import explorecourses.filters as filters

def fetch_course_handler(course_id: int, class_id: int) -> Tuple[Course, Section]:
    api = CourseConnection()
    
    # Convert course_id to string for the query - the API expects a search string
    candidates = api.get_courses_by_query(course_id, filters.AUTUMN, filters.WINTER, filters.SPRING, filters.SUMMER, year=ACADEMIC_YEAR )
    courses: list[Course] = []
    
    for c in candidates:
        if c.course_id == course_id:
            courses.append(c)
            
    if len(courses) == 0:
        raise ValueError(f"No courses with course_id {course_id}")
    
    sections: list[Section] = []
    
    course = None
    section = None
    
    for c in courses:
        for s in c.sections:
            if s.class_id == class_id:
                course = c
                section = s
            
    if section == None or course == None:
        raise ValueError(f"No section with class_id {class_id}")
    
    return course, section