from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action



from .serializers import UserSerializer, VolunteerAdvertSerializer, FundraiserSerializer
from .models import Fundraiser, User, VolunteerAdvert

# Create your views here.
class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            token = Token.objects.get(user_id=serializer.data.get('id'))
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetAuthUserView(APIView):
    authentication_classes = (TokenAuthentication,)

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

    def get(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.get(id=request.user.id)
        data = UserSerializer(user).data
        return Response(data)    

class FundraiserView(APIView):
    authentication_classes = (TokenAuthentication,)
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = FundraiserSerializer(data=request.data,context={'location': request.data["location"], 'volunteers': request.data["volunteers"], "user_id": request.user.id})

        if serializer.is_valid():
            fundraiser = serializer.save()
            return Response(FundraiserSerializer(fundraiser).data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)

        fundraisers = Fundraiser.objects.all()
        fundraisers_data = FundraiserSerializer(fundraisers, many=True).data
        return Response(fundraisers_data, status=status.HTTP_200_OK)        


class VolunteerAdvertView(APIView):
    authentication_classes = (TokenAuthentication,)
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)

        volunteer_advert_serializer = VolunteerAdvertSerializer(data=request.data,context={'skills_to_add': request.data["skills"], "user_id": request.user.id})

        if volunteer_advert_serializer.is_valid():
            volunteer = volunteer_advert_serializer.save()
            return Response(VolunteerAdvertSerializer(volunteer).data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=volunteer_advert_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)

        volunteer_adverts = VolunteerAdvert.objects.all()
        volunteer_adverts_data = VolunteerAdvertSerializer(volunteer_adverts, many=True).data
        return Response(volunteer_adverts_data, status=status.HTTP_200_OK)
        
#CLASSES FOR CUSTOM INTERACTION

class UserEntitiesViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = User.objects.all()

    @action(detail=False, methods=['get'])
    def fundraiser(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        # user = User.objects.get(id=request.user.id)
        fundraisers = Fundraiser.objects.filter(created_by=request.user.id)
        return Response(FundraiserSerializer(fundraisers, many=True).data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def volunteer(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        # user = User.objects.get(id=request.user.id)
        volunteers = VolunteerAdvert.objects.filter(created_by=request.user.id)
        return Response(VolunteerAdvertSerializer(volunteers, many=True).data, status=status.HTTP_200_OK)         
