from django.urls import path
from . import views

#URLConf
urlpatterns = [
    
    # User login / signup page route
    path(route='', view=views.dashboard, name='dashboard'),
 
]  