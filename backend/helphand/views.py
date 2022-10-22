from django.http import Http404
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action

from django.conf import settings

import helphand.helpers

from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

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
            'token': token.key
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
        fundraisers = Fundraiser.objects.all()
        fundraisers_data = FundraiserSerializer(fundraisers, many=True).data
        return Response(fundraisers_data, status=status.HTTP_200_OK)        


class FundraiserDetail(APIView):
    authentication_classes = (TokenAuthentication,)
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return Fundraiser.objects.get(pk=pk)
        except:
            raise Http404

    def auth_user(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return
        return request.user.id

    def get(self, request, pk, format=None):
        fundraiser = self.get_object(pk)
        serializer = FundraiserSerializer(fundraiser)
        return Response(serializer.data) 

    def put(self, request, pk, format=None):
        user_id = self.auth_user(request)
        fundraiser = self.get_object(pk)
        if user_id == None:
            return Response(data={'error': 'No Token. Authorization Denied'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        elif fundraiser.created_by != user_id:
            return Response(data={'error':'Access denied. Cannot update other users entities.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        serializer = FundraiserSerializer(fundraiser, data=request.data, context={'location': request.data["location"], 'volunteers': request.data["volunteers"]})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user_id = self.auth_user(request)
        fundraiser = self.get_object(pk)
        if user_id == None:
            return Response(data={'error': 'No Token. Authorization Denied'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        elif fundraiser.created_by != user_id:
            return Response(data={'error':'Access denied. Cannot delete other users entities.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        fundraiser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
        volunteer_adverts = VolunteerAdvert.objects.all()
        volunteer_adverts_data = VolunteerAdvertSerializer(volunteer_adverts, many=True).data
        return Response(volunteer_adverts_data, status=status.HTTP_200_OK)

class VolunteerAdvertDetail(APIView):
    authentication_classes = (TokenAuthentication,)
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return VolunteerAdvert.objects.get(pk=pk)
        except:
            raise Http404

    def auth_user(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return
        return request.user.id

    def get(self, request, pk, format=None):
        volunteer = self.get_object(pk)
        serializer = VolunteerAdvertSerializer(volunteer)
        return Response(serializer.data) 

    def put(self, request, pk, format=None):
        user_id = self.auth_user(request)
        volunteer = self.get_object(pk)
        print(request.FILES)
        if user_id == None:
            return Response(data={'error': 'No Token. Authorization Denied'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        elif volunteer.created_by != user_id:
            return Response(data={'error':'Access denied. Cannot update other users entities.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        serializer = VolunteerAdvertSerializer(volunteer, data=request.data,context={'skills_to_add': request.data["skills"]})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user_id = self.auth_user(request)
        volunteer = self.get_object(pk)
        if user_id == None:
            return Response(data={'error': 'No Token. Authorization Denied'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        elif volunteer.created_by != user_id:
            return Response(data={'error':'Access denied. Cannot delete other users entities.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        volunteer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)        
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
        volunteers = VolunteerAdvert.objects.filter(created_by=request.user.id)
        return Response(VolunteerAdvertSerializer(volunteers, many=True).data, status=status.HTTP_200_OK)         


class ReportVolunteer(APIView):
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = User.objects.get(id=request.user.id)#person who applies for(Sender)
        addresser_email = request.data.get("addresser_email")#person who created the volunteer advert
        addresser_name = request.data.get("addresser_name")#person who created the volunteer advert
        volunteer_role = request.data.get("volunteer_role")
        email_content = request.data.get("email_content")
        
        context = {
            'addresser_name': addresser_name,
            'current_user': user,
            'volunteer_role': volunteer_role,
            'email_content': email_content
        }

        email_html_message = render_to_string('email/report_volunteer.html', context)
        email_plaintext_message = render_to_string('email/report_volunteer.txt', context)

        msg = EmailMultiAlternatives(
            # title:
            "Pojawiło się nowe zgłoszenie dla {title}".format(title=volunteer_role),
            # message:
            email_plaintext_message,
            # from:
            settings.EMAIL_HOST_USER,
            # to:
            [addresser_email]
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.attach(helphand.helpers.logo_helphand())

        msg.send()
        return Response(data={'status':'OK'}, status=status.HTTP_200_OK)         

    
