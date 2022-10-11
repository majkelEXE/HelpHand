from enum import unique
from pyexpat import model
from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from phonenumber_field.modelfields import PhoneNumberField
from rest_framework.authtoken.models import Token



# Create your models here.
class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, first_name, last_name, date_of_birth, phone_number, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        if not first_name:
            raise ValueError('Users must have names')


        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name, 
            last_name=last_name,
            date_of_birth=date_of_birth,
            phone_number=phone_number
        )
        user.set_password(password)
        print("problem jest tu1")
        user.save(using=self._db)
        print("problem jest tu2")
        Token.objects.create(user=user)

        return user


class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=30)
    date_of_birth = models.DateField()
    phone_number = PhoneNumberField(null=False, blank=False, unique=True, region="PL")

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return self.email

class Fundraisers(models.Model):
    title = models.CharField(max_length = 20)
    short_description = models.CharField(max_length = 200)
    short_description = models.TextField()
