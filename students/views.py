from django.shortcuts import render, redirect
from .models import Student
from .forms import StudentForm
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import StudentSerializer



def home(request):

    # Search Feature

    search = request.GET.get('search')

    if search:
        students = Student.objects.filter(
            name__icontains=search
        )

    else:
        students = Student.objects.all()

    # Add Student Form

    form = StudentForm()

    if request.method == 'POST':

        form = StudentForm(request.POST)

        if form.is_valid():

            form.save()

            return redirect('/')

    # Send data to HTML

    context = {

        'students': students,

        'form': form

    }

    return render(request,
                  'students/index.html',
                  context)


# Delete Student

def delete_student(request, id):

    student = Student.objects.get(id=id)

    student.delete()

    return redirect('/')
def signup(request):

    if request.method == 'POST':

        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('/accounts/login')

    else:
        form = UserCreationForm()

    return render(request, 'students/signup.html', {'form': form})
@api_view(['GET'])

def student_api(request):

    students = Student.objects.all()

    serializer = StudentSerializer(
        students,
        many=True
    )

    return Response(serializer.data)