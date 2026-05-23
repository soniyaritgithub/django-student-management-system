from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from students.views import signup_api

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path('admin/', admin.site.urls),

    # CUSTOM SIGNUP API

    path('signup/', signup_api),

    # STUDENTS APP

    path('', include('students.urls')),

    # JWT LOGIN

    path(
        'api/token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),

    path(
        'api/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),

]

if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )