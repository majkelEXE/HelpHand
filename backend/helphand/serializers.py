from pyexpat import model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from helphand.models import User, Fundraiser, VolunteerAdvert, Skill, Location
import json


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "date_of_birth", "phone_number", "password"]
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

class FundraiserSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    
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
        skills_data = json.loads(self.context.get("skills_to_add"))
        volunteer_advert = VolunteerAdvert.objects.create(**validated_data, created_by=user_id)
        for skill in skills_data:
            skill_obj, _ = Skill.objects.get_or_create(name=skill)
            volunteer_advert.skills.add(skill_obj)

        return volunteer_advert
    
