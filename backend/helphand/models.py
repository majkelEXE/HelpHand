from email.policy import default
from enum import unique
from pyexpat import model
from tokenize import blank_re
from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from phonenumber_field.modelfields import PhoneNumberField
from rest_framework.authtoken.models import Token


# Create your models here.
class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, first_name, last_name, date_of_birth, phone_number, password):
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
        user.save(using=self._db)
        Token.objects.create(user=user)

        return user


class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=20, null=False, blank=False)
    last_name = models.CharField(max_length=30, null=False, blank=False)
    date_of_birth = models.DateField(null=False, blank=False)
    phone_number = PhoneNumberField(null=False, blank=False, unique=True, region="PL")

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return self.email

class Fundraiser(models.Model):
    created_by = models.IntegerField(null=False, blank=False, default=-1)
    name = models.CharField(max_length = 50, null=False, blank=False)
    description = models.CharField(max_length = 250, null=False, blank=False)
    date = models.DateTimeField(null=False, blank=False)#FORMAT: 2006-10-25 14:30:59
    content = models.TextField(null=False, blank=False)
    image = models.ImageField(upload_to="fundraiser_photos", blank=True)
    contact_email = models.EmailField(null=False,blank=False)   
    contact_phone = PhoneNumberField(null=False, blank=False, unique=False, region="PL")

class Location(models.Model):
    name = models.CharField(max_length = 120, null=False, blank=False)
    latitude = models.TextField(null=False, blank=False)
    longtitude = models.TextField(null=False, blank=False)
    fundraiser = models.OneToOneField(Fundraiser, on_delete=models.CASCADE)

class Skill(models.Model):
    name = models.CharField(max_length = 80, primary_key=True, null=False, blank=False, unique=True)

    def __str__(self):
        return self.name

class VolunteerAdvert(models.Model):
    created_by = models.IntegerField(null=False, blank=False, default=-1)
    fundraiser = models.ForeignKey(Fundraiser, on_delete=models.CASCADE, related_name='volunteers', blank=True, null=True)
    role = models.CharField(max_length = 80, null=False, blank=False)
    description = models.CharField(max_length = 250, null=False, blank=False)
    content = models.TextField(null=False, blank=False)
    image = models.ImageField(upload_to="volunteer_photos", blank=True)
    contact_email = models.EmailField(null=False,blank=False)   
    contact_phone = PhoneNumberField(null=False, blank=False, unique=False, region="PL")
    skills = models.ManyToManyField(Skill)

