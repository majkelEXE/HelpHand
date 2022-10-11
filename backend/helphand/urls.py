from django.urls import path

from .views import (
    UserView,
    GetAuthUserView
)

urlpatterns = [
    path('users', UserView.as_view()),
    path('auth', GetAuthUserView.as_view()),
]