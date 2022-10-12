from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser



from .serializers import UserSerializer, VolunteerAdvertSerializer
from .models import User, VolunteerAdvert

# Create your views here.
class UserView(APIView):
    def post(self, request):
        print("test")
        serializer = UserSerializer(data=request.data)
        print("po utworzeniu serializera")

        if serializer.is_valid():
            print("na poczatku is valid")
            user = serializer.save()
            print("miedzy userem a tokenem")
            token = Token.objects.get(user_id=serializer.data.get('id'))
            return Response({
            'token': token.key,
            'email': user.email
            }, status=status.HTTP_201_CREATED)
        else:
            print("w bledzie od razu")
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetAuthUserView(APIView):
    print("mama nadzieje, ze to nie jest focusowane")
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        token = request.headers.get("Authorization")
        print("wchodzi")
        print(request.headers)
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.get(id=request.user.id)
        data = UserSerializer(user).data
        return Response(data)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if email == "" or password == "":
            return Response({'error': 'Please provide both email and password'},status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)

        if not user:
            return Response({'error': 'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'email': user.email,
            }, status=status.HTTP_200_OK)


class VolunteerAdvertView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print("wchodzi")
        print(request.data)
        print("jest dalej")
        serializer = VolunteerAdvertSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("w bledzie od razu")
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        volunteer_adverts = VolunteerAdvert.objects.all()
        volunteer_adverts_data = VolunteerAdvertSerializer(volunteer_adverts, many=True).data
        return Response(volunteer_adverts_data, status=status.HTTP_200_OK)
        