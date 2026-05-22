from django.urls import path

from . import views

urlpatterns = [

    path('', views.home, name='home'),

    path('signup/', views.signup, name='signup'),

    path('delete/<int:id>/',
         views.delete_student,
         name='delete'),

    path('logout/',
         views.logout_view,
         name='logout'),

    path('student/<int:id>/',
         views.profile,
         name='profile'),

    # API

    path('api/',
         views.student_api),

    path('api/<int:id>/',
         views.student_api),

    # Export

    path('export-excel/',
         views.export_excel,
         name='export_excel'),

    path('export-pdf/',
         views.export_pdf,
         name='export_pdf'),

]