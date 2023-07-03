# from django.db import models
from djongo import models
# from django.db.models import CharField
# from django.contrib.postgres.fields import ArrayField


# Create your models here.

class Work(models.Model) :
    work_id = models.CharField(max_length=20, blank=True) 
    work_heading = models.CharField(max_length=100, blank=True, default=f'default_work_desc_{work_id}') 
    work_desc = models.CharField(max_length=200, blank=True, default=f'default_work_desc_{work_id}') 
    work_location = models.CharField(max_length=100, blank=True, default=f'default_work_location_{work_id}') 
    work_amount = models.CharField(max_length=50, blank=True, default='0') 
    # work_reciept = models.ArrayField(models.CharField(max_length=200), blank=True)
    added_at = models.CharField(max_length=50, blank=True, default='-') 
    edited_at = models.CharField(max_length=50, blank=True, default='-') 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # MUser = models.ForeignKey(MUser, on_delete=models.CASCADE, blank=True) 

    


    
    
# class Work(models.Model):
    # work_id = models.CharField(max_length=20)
    # work_heading = models.CharField(max_length=100)
    # work_desc = models.CharField(max_length=200)
    # work_location = models.CharField(max_length=100)
    # work_amount = models.CharField(max_length=50)
    # work_reciept = models.ArrayField(model_container=models.CharField(max_length=200))
    # added_at = models.CharField(max_length=50)
    # edited_at = models.CharField(max_length=50)
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True) 

# class Work(models.Model):
#     work_id = models.CharField()
#     work_heading = models.CharField()
#     work_desc = models.CharField()
#     work_location = models.CharField()
#     work_amount = models.CharField()
    # work_reciept = models.ArrayField(model_container=models.CharField(), null=True)
    # added_at = models.CharField()
    # edited_at = models.CharField()
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True) 
    
    
    