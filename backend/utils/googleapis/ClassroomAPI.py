import confiq
import os
import requests
from typing import Optional
from bson import ObjectId


class GoogleRootApi(requests.Session):
    def __init__(self):
        super().__init__()
        self.base_url = os.getenv("CLASSROOM_API", "")
        self.headers.update({
            "Authorization": f"Bearer {os.getenv('YAZAN_BEARER_TOKEN', "")}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        })

    def request(self, method, url, *args, **kwargs):
        """Override request method to prepend the base URL"""
        return super().request(method, f"{self.base_url}{url}", *args, **kwargs)


class GoogleClassroomFunctions:
    _api: Optional[GoogleRootApi] = None

    @staticmethod
    def __load_root_api() -> None:
        if GoogleClassroomFunctions._api is None:
            GoogleClassroomFunctions._api = GoogleRootApi()

    @staticmethod
    def __get_api() -> GoogleRootApi:
        GoogleClassroomFunctions.__load_root_api()
        return GoogleClassroomFunctions._api

    @staticmethod
    def create_course(name: str, course_code: str, teacher: str):
        payload = {
            "name": name,
            "semester_id": "66b51ff7179e3b24f921ec5d",
            "course_code": course_code,
            "teachers": [teacher],
            "gclass_create": True
        }
        course = GoogleClassroomFunctions.__get_api().post(url="/courses/create", json=payload)
        return course.json()

    @staticmethod
    def get_course(course_id: str):
        course = GoogleClassroomFunctions.__get_api().get(url=f"/courses/get/{course_id}")
        return course.json()

    @staticmethod
    def get_courses():
        courses = GoogleClassroomFunctions.__get_api().post(url="/courses/courses_list", json={"per_page": 15, "page": 1, "archived": False, "hide_homeroom_courses": True})
        return courses.json()

    @staticmethod
    def get_course_google_classroom_student_data(course_id: ObjectId):
        pass

    @staticmethod
    def get_student_google_classroom_data(email: str):
        pass

    @staticmethod
    def get_user_id(_id: str):
        user = GoogleClassroomFunctions.__get_api().get(f"/teachers/{_id}")
        return user.json()

    @staticmethod
    def get_student_google_classroom_data_for_course(email: str, course: ObjectId):
        pass

    @staticmethod
    def get_gclass_url(course_id: str):
        response = GoogleClassroomFunctions.__get_api().get(url=f"/courses/get_gclass_url/{course_id}")
        return response.text



if __name__ == "__main__":
    pass
    # u = GoogleClassroomFunctions.get_user_id("63740d6ab87a3421810f2415")
    # print(u.json())
    #
    # print("\n=\n")
    #
    # c_lst = GoogleClassroomFunctions.get_courses()
    # print(c_lst.json())
    #
    # print("\n=\n")
    #
    # c = GoogleClassroomFunctions.get_course("638e2986c8cf54eb2621160f")
    # print(c.text)
    # print(c)
    # c = GoogleClassroomFunctions.get_gclass_url("638e2986c8cf54eb2621160f")
    # print(c)
    # n = GoogleClassroomFunctions.create_course("Intro to Computer Science", "CSC148", "63740d6ab87a3421810f2415")
    # print(n)

