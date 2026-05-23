from django.shortcuts import render, redirect
from .models import Student
from .forms import StudentForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from rest_framework.decorators import authentication_classes
from rest_framework.authentication import SessionAuthentication
from django.http import JsonResponse
import json



# HOME PAGE

def home(request):

    if request.method == 'POST':

        form = StudentForm(
            request.POST,
            request.FILES
        )

        if form.is_valid():

            form.save()

            return redirect('/')

    else:

        form = StudentForm()

    students = Student.objects.all()

    return render(

        request,

        'students/index.html',

        {

            'students': students,

            'form': form

        }

    )


# SIGNUP PAGE

def signup(request):

    if request.method == 'POST':

        form = UserCreationForm(request.POST)

        if form.is_valid():

            form.save()

            return redirect('/accounts/login/')

    else:

        form = UserCreationForm()

    return render(

        request,

        'students/signup.html',

        {

            'form': form

        }

    )


# DELETE STUDENT

def delete_student(request, id):

    student = Student.objects.get(id=id)

    student.delete()

    return redirect('/')


# LOGOUT

def logout_view(request):

    logout(request)

    return redirect('/accounts/login/')


# STUDENT PROFILE PAGE

def profile(request, id):

    student = Student.objects.get(id=id)

    return render(

        request,

        'students/profile.html',

        {

            'student': student

        }

    )


# REST API

@api_view(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])

def student_api(request, id=None):

    # GET ALL STUDENTS

    if request.method == 'GET':

        students = Student.objects.all()

        data = []

        for student in students:

            data.append({

                'id': student.id,

                'name': student.name,

                'email': student.email,

                'course': student.course,

                'attendance': student.attendance,

                'image': student.image.url
                if student.image else None,

            })

        return Response(data)

    # ADD STUDENT

    elif request.method == 'POST':

        data = request.data

        Student.objects.create(

            name=data.get('name'),

            email=data.get('email'),

            course=data.get('course'),

            image=request.FILES.get('image')

        )

        return Response({

            'message': 'Student Added Successfully'

        })

    # UPDATE STUDENT

    elif request.method == 'PUT' or request.method == 'PATCH':

        try:

            student = Student.objects.get(id=id)

            student.name = request.data.get(
                'name',
                student.name
            )

            student.email = request.data.get(
                'email',
                student.email
            )

            student.course = request.data.get(
                'course',
                student.course
            )

            student.attendance = request.data.get(
                'attendance',
                student.attendance
            )

            student.save()

            return Response({

                'message':
                'Student Updated Successfully'

            })

        except Exception as e:

            return Response({

                'error': str(e)

            })

    # DELETE STUDENT

    elif request.method == 'DELETE':

        try:

            student = Student.objects.get(id=id)

            student.delete()

            return Response({

                'message':
                'Student Deleted Successfully'

            })

        except:

            return Response({

                'error':
                'Student Not Found'

            })


# EXPORT EXCEL

def export_excel(request):

    students = Student.objects.all().values(

        'id',

        'name',

        'email',

        'course'

    )

    df = pd.DataFrame(students)

    response = HttpResponse(

        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    )

    response['Content-Disposition'] = \
        'attachment; filename=students.xlsx'

    df.to_excel(response, index=False)

    return response


# EXPORT PDF

def export_pdf(request):

    response = HttpResponse(
        content_type='application/pdf'
    )

    response['Content-Disposition'] = \
        'attachment; filename=students.pdf'

    p = canvas.Canvas(response)

    students = Student.objects.all()

    y = 800

    p.drawString(200, 820, "Student List")

    for student in students:

        p.drawString(

            100,

            y,

            f"{student.id} | "
            f"{student.name} | "
            f"{student.email} | "
            f"{student.course}"

        )

        y -= 30

    p.save()

    return response

@csrf_exempt
def signup_api(request):

    if request.method == 'POST':

        try:

            data = json.loads(request.body)

            username = data.get('username')

            email = data.get('email')

            password = data.get('password')

            if User.objects.filter(username=username).exists():

                return JsonResponse({

                    'error': 'Username already exists'

                }, status=400)

            User.objects.create_user(

                username=username,

                email=email,

                password=password

            )

            return JsonResponse({

                'message': 'Account Created Successfully'

            }, status=201)

        except Exception as e:

            return JsonResponse({

                'error': str(e)

            }, status=400)

    return JsonResponse({

        'error': 'Invalid request'

    }, status=405)