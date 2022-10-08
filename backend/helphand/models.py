from pyexpat import model
from django.db import models

# Create your models here.
class Fundraisers(models.Model):
    title = models.CharField(max_length = 20)
    short_description = models.CharField(max_length = 200)
    short_description = models.TextField()
