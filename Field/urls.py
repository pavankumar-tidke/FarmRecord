from django.urls import path
from . import views


#URLConf
urlpatterns = [
      
    # functionality routes    
    path(route='sw/', view=views.save_work, name='aw'),
    path(route='fetch/all_work/', view=views.view_all_work, name='vaw'),
 
]  

