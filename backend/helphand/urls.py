from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from .views import (
    UserView,
    GetAuthUserView,
    VolunteerAdvertView
)

urlpatterns = [
    path('users', UserView.as_view()),
    path('auth', GetAuthUserView.as_view()),
    path('volunteer', VolunteerAdvertView.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)