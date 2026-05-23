from django.db import models
from django.contrib.auth.models import User


class Student(models.Model):

    # USER LINK

    user = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        null=True,

        blank=True

    )

    name = models.CharField(max_length=100)

    email = models.EmailField()

    course = models.CharField(max_length=100)

    image = models.ImageField(

        upload_to='students/',

        blank=True,

        null=True

    )

    attendance = models.CharField(

        max_length=20,

        default='Absent'

    )

    def __str__(self):

        return self.name