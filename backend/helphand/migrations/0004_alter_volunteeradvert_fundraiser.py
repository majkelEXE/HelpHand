# Generated by Django 4.1.2 on 2022-10-12 17:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('helphand', '0003_fundraiser_volunteeradvert_volunteerphoto_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='volunteeradvert',
            name='fundraiser',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='VolunteerAdvert', to='helphand.fundraiser'),
        ),
    ]