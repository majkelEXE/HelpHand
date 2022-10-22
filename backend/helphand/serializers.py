from django.core.files.storage import FileSystemStorage
from django.conf import settings

from copyreg import constructor
from pyexpat import model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from helphand.models import User, Fundraiser, VolunteerAdvert, Skill, Location
import json
import os
import time


from django.core import exceptions
import django.contrib.auth.password_validation as validators


# from .forms import UploadedImageForm


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "date_of_birth", "phone_number", "password"]
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def validate(self, data):
        password = data.get('password')

        user = User(**data)

        errors = dict() 
        try:
            # validate the password and catch the exception
            validators.validate_password(password=password, user=user)
        
        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        
        if errors:
            raise serializers.ValidationError(errors)
        
        return super(UserSerializer, self).validate(data)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name']

class VolunteerAdvertSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = VolunteerAdvert
        fields = "__all__"

    def create(self, validated_data):
        user_id = self.context.get("user_id")
        print(user_id)
        skills_data = json.loads(self.context.get("skills_to_add"))
        volunteer_advert = VolunteerAdvert.objects.create(**validated_data, created_by=user_id)
        for skill in skills_data:
            skill_obj, _ = Skill.objects.get_or_create(name=skill)
            volunteer_advert.skills.add(skill_obj)

        return volunteer_advert

    def update(self, instance, validated_data):
        print("czy to dziala")
        if "image" in validated_data.keys():
            image = validated_data.pop('image')
            image_path = instance.image.path
            if os.path.exists(image_path):
                os.remove(image_path)

            instance.image = image
            instance.save()

        skills_data = json.loads(self.context.get("skills_to_add"))
        VolunteerAdvert.objects.filter(id=instance.id).update(**validated_data)

        # image_data = instance.image.name.split("/")
        # fs = FileSystemStorage(location="media/" + image_data[0] + "/")#without "media/" location is set to helphand / volunteer_photos
        # fs.save(image_data[1], image)

        # while not os.path.exists(image_path):
        #     time.sleep(1)

        instance.skills.all().delete()
        for skill in skills_data:
            skill_obj, _ = Skill.objects.get_or_create(name=skill)
            instance.skills.add(skill_obj)


        instance = VolunteerAdvert.objects.get(pk=instance.id)
        return instance
    
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

class FundraiserSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    volunteers = VolunteerAdvertSerializer(read_only=True, many=True)

    class Meta:
        model = Fundraiser
        fields = "__all__"
        
    def create(self, validated_data):
        user_id = self.context.get("user_id")
        location = json.loads(self.context.get("location"))
        volunteers = json.loads(self.context.get("volunteers"))
        fundraiser = Fundraiser.objects.create(**validated_data, created_by=user_id)
        Location.objects.create(**location, fundraiser=fundraiser)
        for volunteer in volunteers:
            volunteer_obj = VolunteerAdvert.objects.get(id=volunteer)
            volunteer_obj.fundraiser = fundraiser
            volunteer_obj.save()
        return fundraiser

    def update(self, instance, validated_data):
        print(validated_data)
        if "image" in validated_data.keys():
            image = validated_data.pop('image')
            image_path = str(instance.image.path)
            if os.path.exists(image_path):
                os.remove(image_path)

            print("wchodzi")

            instance.image = image
            instance.save()


        location = json.loads(self.context.get("location"))
        volunteers = json.loads(self.context.get("volunteers"))
        location_obj = instance.location

        Location.objects.filter(id=location_obj.id).update(**location)
        Fundraiser.objects.filter(id=instance.id).update(**validated_data)


        # image_data = instance.image.name.split("/")
        # fs = FileSystemStorage(location="media/" + image_data[0] + "/")#without "media/" location is set to helphand / fundraiser_photos
        # fs.save(image_data[1], image)

        # while not os.path.exists(image_path):
        #     time.sleep(1)
        

        for volunteer in instance.volunteers.all():
            if volunteer.id not in volunteers:
                volunteer.fundraiser = None
                volunteer.save()
            else:
                volunteers.remove(volunteer.id)

        for volunteer_id in volunteers:
            volunteer_obj = VolunteerAdvert.objects.get(id=volunteer_id)
            volunteer_obj.fundraiser = instance
            volunteer_obj.save()

        instance = Fundraiser.objects.get(pk=instance.id)
        return instance

