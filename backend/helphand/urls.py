from rest_framework import routers
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from .views import (
    UserView,
    GetAuthUserView,
    VolunteerAdvertView, 
    VolunteerAdvertDetail,
    FundraiserView,
    FundraiserDetail,
    UserEntitiesViewSet,
    ReportVolunteer
)

router = routers.DefaultRouter()
router.register(r'user_entities', UserEntitiesViewSet)


urlpatterns = [
    path('users', UserView.as_view()),
    path('auth', GetAuthUserView.as_view()),
    path('volunteer', VolunteerAdvertView.as_view()),
    path('fundraiser', FundraiserView.as_view()),  
    path('fundraiser/<int:pk>', FundraiserDetail.as_view()),  
    path('volunteer/<int:pk>', VolunteerAdvertDetail.as_view()),  
    path('report_volunteer', ReportVolunteer.as_view()),  
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += router.urls