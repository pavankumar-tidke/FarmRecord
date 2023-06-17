from django.urls import path
from . import views

#URLConf
urlpatterns = [
    
    # User login / signup page route
    path(route='', view=views.auth_page, name='auth_page_viewer'), 
    path(route='setsession/', view=views.set_session, name='setsession'),
    
    
    # admin login / signup page route
    path(route='authadmin/', view=views.admin_auth_page, name=''), 



]   