from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView

urlpatterns = [

    path('', views.home, name='home'),

    path('signup/', views.signup, name='signup'),

    path('delete/<int:id>/', views.delete_student, name='delete'),

    path(
        'logout/',
        LogoutView.as_view(
            next_page='/accounts/login/'
        ),
        name='logout'
    ),

    path('api/', views.student_api),

]