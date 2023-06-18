from django.db import models
from Auth.models  import MUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Work(models.Model) :
    work_id = models.CharField(max_length=20, null=True) 
    work_heading = models.CharField(max_length=100, null=True, default=f'default_work_desc_{work_id}') 
    work_desc = models.CharField(max_length=200, null=True, default=f'default_work_desc_{work_id}') 
    work_location = models.CharField(max_length=100, null=True, default=f'default_work_location_{work_id}') 
    work_amount = models.CharField(max_length=50, null=True, default='₹ 0 /-') 
    work_reciept = ArrayField(models.CharField(max_length=200), null=True)
    added_at = models.CharField(max_length=50, null=True, default='-') 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    MUser = models.ForeignKey(MUser, on_delete=models.CASCADE, null=True) 