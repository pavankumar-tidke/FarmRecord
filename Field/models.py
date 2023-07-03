from djongo import models 

# Create your models here.

class Work(models.Model) :
    work_id = models.CharField(max_length=20, blank=True) 
    work_heading = models.CharField(max_length=100, blank=True, default=f'default_work_desc_{work_id}') 
    work_desc = models.CharField(max_length=200, blank=True, default=f'default_work_desc_{work_id}') 
    work_location = models.CharField(max_length=100, blank=True, default=f'default_work_location_{work_id}') 
    work_amount = models.CharField(max_length=50, blank=True, default='0')  
    added_at = models.CharField(max_length=50, blank=True, default='-') 
    edited_at = models.CharField(max_length=50, blank=True, default='-') 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 

    


    
     