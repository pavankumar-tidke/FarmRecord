from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=50) 
    email = models.CharField(max_length=50, null=True) 
    password = models.CharField(max_length=256, null=True)
    status = models.CharField(max_length=10, default='pending')
    activate = models.BooleanField(max_length=6, default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Admin(models.Model) :
    name = models.CharField(max_length=50) 
    email = models.CharField(max_length=50, null=True) 
    password = models.CharField(max_length=256, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
