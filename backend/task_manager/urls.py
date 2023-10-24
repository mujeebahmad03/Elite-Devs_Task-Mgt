from django.urls import path
from .views import *

urlpatterns = [
    path("create/", create_task, name="create_task"),
    path("update/<int:task_id>/", update_task, name="update_task"),
    path("delete/<int:task_id>/", delete_task, name="delete_task"),
    path("list/", list_tasks, name="list_tasks"),
    path("register/", register_user, name="register"),
    path("login/", user_login, name="user_login"),
    path("logout/", user_logout, name="user_logout"),
    path("profile/", update_profile, name="update_profile"),
    path("password/", change_password, name="change_password"),
]
