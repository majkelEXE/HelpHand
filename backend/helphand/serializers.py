from rest_framework import serializers
from rest_framework.authtoken.models import Token
from helphand.models import User, Fundraisers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "date_of_birth", "phone_number", "password"]
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        print("serializer srodek")
        user = User.objects.create_user(**validated_data)
        # user.save()
        # Token.objects.create(user=user)
        return user

    
